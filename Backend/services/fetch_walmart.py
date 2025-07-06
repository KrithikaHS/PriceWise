import httpx
import re
import os
from dotenv import load_dotenv

load_dotenv()

WALMART_API_KEY = os.getenv("WALMART_API_KEY")

def parse_price(raw_price):
    if not raw_price:
        return 0
    clean = re.sub(r"[^\d]", "", raw_price)
    return int(clean) if clean else 0

def fetch_walmart_products(query: str):
    return [
        {
            "title": f"{query} - Walmart Budget",
            "price": 27999,
            "rating": 4.1,
            "image": "/images/walmart_budget.jpg",
            "link": "https://walmart.com/mock-product-budget",
            "platform": "Walmart",
            "storeLat": 12.9716,
            "storeLon": 77.5946
        },
        {
            "title": f"{query} - Walmart Pro",
            "price": 45999,
            "rating": 4.5,
            "image": "/images/walmart_pro.jpg",
            "link": "https://walmart.com/mock-product-pro",
            "platform": "Walmart",
            "storeLat": 12.9716,
            "storeLon": 77.5946
        }
    ]

