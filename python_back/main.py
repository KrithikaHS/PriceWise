# from fastapi import FastAPI, Query
# from fastapi.middleware.cors import CORSMiddleware
# from typing import List
# from math import radians, cos, sin, asin, sqrt, atan2
# from rapidfuzz import process, fuzz

# app = FastAPI()

# # CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Mock product data (same as before, not repeated here for brevity)
# # Paste mock_amazon_products and mock_walmart_products here...

# # Sample store data (you can reuse the same mock data from your code)
# mock_amazon_products = [
#     {"title": "iPhone 14 Pro - 128GB", "price": 119999, "rating": 4.8, "image": "/images/iphone14.jpg", "link": "https://amazon.in/iphone14-128", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "iPhone 14 Pro - 256GB", "price": 124999, "rating": 4.9, "image": "/images/iphone14.jpg", "link": "https://amazon.in/iphone14-256", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "iPhone 14 Pro - 512GB", "price": 134999, "rating": 4.7, "image": "/images/iphone14.jpg", "link": "https://amazon.in/iphone14-512", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "iPhone 14 Pro - 128GB", "price": 119999, "rating": 4.8, "image": "/images/iphone14.jpg", "link": "https://amazon.in/iphone14-128", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "iPhone 14 Pro - 256GB", "price": 124999, "rating": 4.9, "image": "/images/iphone14.jpg", "link": "https://amazon.in/iphone14-256", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "iPhone 14 Pro - 512GB", "price": 134999, "rating": 4.7, "image": "/images/iphone14.jpg", "link": "https://amazon.in/iphone14-512", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},

#     {"title": "Samsung Galaxy S23 - 128GB", "price": 89999, "rating": 4.5, "image": "/images/s23.jpg", "link": "https://amazon.in/s23-128", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "Samsung Galaxy S23 - 256GB", "price": 94999, "rating": 4.6, "image": "/images/s23.jpg", "link": "https://amazon.in/s23-256", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "Samsung Galaxy S23 - 512GB", "price": 99999, "rating": 4.4, "image": "/images/s23.jpg", "link": "https://amazon.in/s23-512", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},

#     {"title": "HP Laptop 15s - i3 8GB", "price": 55999, "rating": 4.2, "image": "/images/hp15s.jpg", "link": "https://amazon.in/hp15s-i3", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "HP Laptop 15s - i5 16GB", "price": 65999, "rating": 4.4, "image": "/images/hp15s.jpg", "link": "https://amazon.in/hp15s-i5", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
#     {"title": "HP Laptop 15s - Ryzen 7", "price": 70999, "rating": 4.3, "image": "/images/hp15s.jpg", "link": "https://amazon.in/hp15s-r7", "platform": "Amazon", "storeLat": 13.0827, "storeLon": 80.2707},
# ]

# mock_walmart_products = [
#     {"title": "iPhone 14 Pro - 128GB", "price": 117499, "rating": 4.7, "image": "/images/iphone14.jpg", "link": "https://walmart.com/iphone14-128", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "iPhone 14 Pro - 256GB", "price": 122999, "rating": 4.8, "image": "/images/iphone14.jpg", "link": "https://walmart.com/iphone14-256", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "iPhone 14 Pro - 512GB", "price": 132499, "rating": 4.6, "image": "/images/iphone14.jpg", "link": "https://walmart.com/iphone14-512", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},

#     {"title": "Samsung Galaxy S23 - 128GB", "price": 87999, "rating": 4.6, "image": "/images/s23.jpg", "link": "https://walmart.com/s23-128", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "Samsung Galaxy S23 - 256GB", "price": 92999, "rating": 4.7, "image": "/images/s23.jpg", "link": "https://walmart.com/s23-256", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "Samsung Galaxy S23 - 512GB", "price": 97999, "rating": 4.5, "image": "/images/s23.jpg", "link": "https://walmart.com/s23-512", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},

#     {"title": "HP Laptop 15s - i3 8GB", "price": 54999, "rating": 4.3, "image": "/images/hp15s.jpg", "link": "https://walmart.com/hp15s-i3", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "HP Laptop 15s - i5 16GB", "price": 64999, "rating": 4.5, "image": "/images/hp15s.jpg", "link": "https://walmart.com/hp15s-i5", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "HP Laptop 15s - Ryzen 7", "price": 69999, "rating": 4.4, "image": "/images/hp15s.jpg", "link": "https://walmart.com/hp15s-r7", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "HP Laptop 15s - i3 8GB", "price": 54999, "rating": 4.3, "image": "/images/hp15s.jpg", "link": "https://walmart.com/hp15s-i3", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "HP Laptop 15s - i5 16GB", "price": 64999, "rating": 4.5, "image": "/images/hp15s.jpg", "link": "https://walmart.com/hp15s-i5", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
#     {"title": "HP Laptop 15s - Ryzen 7", "price": 69999, "rating": 4.4, "image": "/images/hp15s.jpg", "link": "https://walmart.com/hp15s-r7", "platform": "Walmart", "storeLat": 28.6139, "storeLon": 77.2090},
# ]  # your existing Walmart data

# # Calculate distance using Haversine formula
# def calculate_distance(lat1, lon1, lat2, lon2):
#     R = 6371
#     dlat = radians(lat2 - lat1)
#     dlon = radians(lon2 - lon1)
#     a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
#     c = 2 * atan2(sqrt(a), sqrt(1 - a))
#     return R * c

# # Calculate shipping cost with normalization and platform-based weights
# def calculate_shipping(userLat, userLon, storeLat, storeLon, platform=None):
#     distance = calculate_distance(userLat, userLon, storeLat, storeLon)
#     distance = min(distance, 500)  # cap distance at 500km
#     base = 5
#     multiplier = 1.8 if platform == "Walmart" else 2.0
#     return round(base + distance * multiplier)

# # Fuzzy filter using RapidFuzz
# def fuzzy_filter(query, products, limit=20, score_cutoff=60):
#     product_titles = [p["title"] for p in products]
#     matches = process.extract(query, product_titles, scorer=fuzz.partial_ratio, limit=limit, score_cutoff=score_cutoff)
#     matched_titles = {m[0] for m in matches}
#     return [p for p in products if p["title"] in matched_titles]

# # /api/compare endpoint
# @app.get("/api/compare")
# def compare_products(
#     query: str,
#     userLat: float,
#     userLon: float,
#     priceWeight: float = 0.7,
#     ratingWeight: float = 1.0,
#     shippingWeight: float = 0.2
# ):
#     all_products = mock_amazon_products + mock_walmart_products
#     filtered = fuzzy_filter(query, all_products)

#     results = []
#     for product in filtered:
#         shipping_charge = calculate_shipping(userLat, userLon, product["storeLat"], product["storeLon"], product["platform"])
#         score = (
#             (100000 - product["price"]) * priceWeight
#             + product["rating"] * 100 * ratingWeight
#             - shipping_charge * shippingWeight
#         )
#         results.append({
#             "product": product,
#             "shippingCharge": shipping_charge,
#             "finalScore": score
#         })

#     if not results:
#         return []

#     best = max(results, key=lambda x: x["finalScore"])
#     best["product"]["shippingCharge"] = best["shippingCharge"]
#     return [best]

# # /api/search endpoint
# @app.get("/api/search")
# def search_products(query: str, userLat: float = None, userLon: float = None):
#     filtered_amazon = fuzzy_filter(query, mock_amazon_products)
#     filtered_walmart = fuzzy_filter(query, mock_walmart_products)
#     all_results = filtered_amazon + filtered_walmart

#     # Multi-criteria smart sort (price + rating)
#     smart_sorted = sorted(all_results, key=lambda x: (x["price"], -x["rating"]))
#     top_k = max(2, len(smart_sorted) // 4)
#     best_combo = smart_sorted[:top_k]

#     # Top 2 suggestions from best combo
#     top_recommendations = []
#     for product in best_combo[:2]:
#         if userLat is not None and userLon is not None:
#             shipping = calculate_shipping(userLat, userLon, product["storeLat"], product["storeLon"], product["platform"])
#             product["shippingCharge"] = shipping
#         else:
#             product["shippingCharge"] = "Enable location for shipping data"
#         top_recommendations.append(product)

#     # Smart Suggestion logic (same as /compare scoring)
#     smart_suggestion = None
#     if all_results:
#         best_product = None
#         best_score = float("-inf")
#         for product in all_results:
#             if userLat is not None and userLon is not None:
#                 shipping = calculate_shipping(userLat, userLon, product["storeLat"], product["storeLon"], product["platform"])
#             else:
#                 shipping = 0  # assume 0 shipping if location not given

#             score = (100000 - product["price"]) * 0.7 + product["rating"] * 100 - shipping * 0.2

#             if score > best_score:
#                 best_score = score
#                 best_product = product.copy()
#                 best_product["shippingCharge"] = (
#                     shipping if userLat is not None else "Enable location for shipping data"
#                 )

#         smart_suggestion = best_product

#     lowest_price = sorted(all_results, key=lambda x: x["price"])
#     highest_rating = sorted(all_results, key=lambda x: x["rating"], reverse=True)

#     best_platform = (
#         "Amazon" if sum(p["rating"] for p in filtered_amazon) >= sum(p["rating"] for p in filtered_walmart)
#         else "Walmart"
#     )

#     return {
#         "allResults": all_results,
#         "lowestPrice": lowest_price,
#         "highestRating": highest_rating,
#         "bestCombo": best_combo,
#         "topRecommendations": top_recommendations,
#         "smartSuggestion": smart_suggestion,
#         "bestPlatform": best_platform
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.search import router as search_router
from api.compare import router as compare_router

app = FastAPI(
    title="PriceWise API",
    description="Backend for product search, comparison, and recommendation",
    version="1.0.0"
)

# Allow frontend on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(search_router, prefix="/api")
app.include_router(compare_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the PriceWise API!"}
