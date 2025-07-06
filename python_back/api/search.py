from fastapi import APIRouter, Query
from typing import List, Optional
from services.fetch_amazon import fetch_amazon_products
from services.fetch_walmart import fetch_walmart_products
from utils.shipping import calculate_shipping
from utils.fuzzy_filter import fuzzy_filter

router = APIRouter()

@router.get("/search")
def search_products(
    query: str,
    userLat: Optional[float] = None,
    userLon: Optional[float] = None
):
    amazon_data = fetch_amazon_products(query)
    walmart_data = fetch_walmart_products(query)
    all_results = amazon_data + walmart_data

    # Multi-criteria smart sort (price + rating)
    smart_sorted = sorted(all_results, key=lambda x: (x["price"], -x["rating"]))
    top_k = max(2, len(smart_sorted) // 4)
    best_combo = smart_sorted[:top_k]

    top_recommendations = []
    for product in best_combo[:2]:
        if userLat is not None and userLon is not None:
            shipping = calculate_shipping(userLat, userLon, product["storeLat"], product["storeLon"], product["platform"])
            product["shippingCharge"] = shipping
        else:
            product["shippingCharge"] = "Enable location for shipping data"
        top_recommendations.append(product)

    # Smart Suggestion logic
    smart_suggestion = None
    if all_results:
        best_product = None
        best_score = float("-inf")
        for product in all_results:
            if userLat is not None and userLon is not None:
                shipping = calculate_shipping(userLat, userLon, product["storeLat"], product["storeLon"], product["platform"])
            else:
                shipping = 0
            score = (100000 - product["price"]) * 0.7 + product["rating"] * 100 - shipping * 0.2
            if score > best_score:
                best_score = score
                best_product = product.copy()
                best_product["shippingCharge"] = (
                    shipping if userLat is not None else "Enable location for shipping data"
                )
        smart_suggestion = best_product

    lowest_price = sorted(all_results, key=lambda x: x["price"])
    highest_rating = sorted(all_results, key=lambda x: x["rating"], reverse=True)

    best_platform = (
        "Amazon" if sum(p["rating"] for p in amazon_data) >= sum(p["rating"] for p in walmart_data)
        else "Walmart"
    )

    return {
        "allResults": all_results,
        "lowestPrice": lowest_price,
        "highestRating": highest_rating,
        "bestCombo": best_combo,
        "topRecommendations": top_recommendations,
        "smartSuggestion": smart_suggestion,
        "bestPlatform": best_platform
    }
