import httpx
import re
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

API_KEY = os.getenv("RAPIDAPI_KEY")  # Get the key from environment

def parse_price(raw_price):
    if not raw_price:
        return 0
    clean = re.sub(r"[^\d]", "", raw_price)
    return int(clean) if clean else 0

def fetch_amazon_products(query: str):
    return [
        {
            "title": f"{query} - Amazon Basic",
            "price": 29999,
            "rating": 4.3,
            "image": "/images/amazon_basic.jpg",
            "link": "https://amazon.com/mock-product-basic",
            "platform": "Amazon",
            "storeLat": 13.0827,
            "storeLon": 80.2707
        },
        {
            "title": f"{query} - Amazon Premium",
            "price": 49999,
            "rating": 4.6,
            "image": "/images/amazon_premium.jpg",
            "link": "https://amazon.com/mock-product-premium",
            "platform": "Amazon",
            "storeLat": 13.0827,
            "storeLon": 80.2707
        }
    ]

