from fastapi import APIRouter, Query
from typing import Optional
from services.fetch_amazon import fetch_amazon_products
from services.fetch_walmart import fetch_walmart_products
from utils.shipping import calculate_shipping
from utils.fuzzy_filter import fuzzy_filter

router = APIRouter()

@router.get("/compare")
def compare_products(
    query: str,
    userLat: float=0.0,
    userLon: float=0.0,
    priceWeight: float = 0.7,
    ratingWeight: float = 1.0,
    shippingWeight: float = 0.2
):
    amazon_data = fetch_amazon_products(query)
    walmart_data = fetch_walmart_products(query)
    all_products = amazon_data + walmart_data
    filtered = fuzzy_filter(query, all_products)

    results = []
    for product in filtered:
        shipping_charge = calculate_shipping(userLat, userLon, product["storeLat"], product["storeLon"], product["platform"])
        score = (
            (100000 - product["price"]) * priceWeight
            + product["rating"] * 100 * ratingWeight
            - shipping_charge * shippingWeight
        )
        results.append({
            "product": product,
            "shippingCharge": shipping_charge,
            "finalScore": score
        })

    if not results:
        return []

    best = max(results, key=lambda x: x["finalScore"])
    best["product"]["shippingCharge"] = best["shippingCharge"]
    return [best]
