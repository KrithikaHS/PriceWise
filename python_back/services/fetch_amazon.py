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

def fetch_amazon_products(query):
    try:
        url = f"https://realtime-amazon-data.p.rapidapi.com/product-search?keyword={query}&country=in&page=1&sort=Featured"
        headers = {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "realtime-amazon-data.p.rapidapi.com",
        }

        response = httpx.get(url, headers=headers, timeout=10.0)
        if response.status_code != 200:
            print("Amazon API Error:", response.status_code, response.text)
            return []

        items = response.json().get("data", {}).get("products", [])
        result = []
        for i in items:
            title = i.get("title")
            raw_price = i.get("price", {}).get("raw", "")
            price = parse_price(raw_price)
            rating = i.get("rating", 0) or 0

            if not title or not price:
                continue

            result.append({
                "title": title,
                "price": price,
                "rating": float(rating),
                "image": i.get("image"),
                "link": i.get("product_url"),
                "platform": "Amazon",
                "storeLat": 13.0827,
                "storeLon": 80.2707,
            })
        return result

    except Exception as e:
        print("Amazon Fetch Exception:", e)
        return []
