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

def fetch_walmart_products(query):
    try:
        url = f"https://walmart-search.p.rapidapi.com/search?query={query}&country=in"
        headers = {
            "x-rapidapi-key": WALMART_API_KEY,
            "x-rapidapi-host": "walmart-search.p.rapidapi.com",
        }

        response = httpx.get(url, headers=headers, timeout=10.0)
        if response.status_code != 200:
            print("Walmart API Error:", response.status_code, response.text)
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
                "platform": "Walmart",
                "storeLat": 12.9716,
                "storeLon": 77.5946,
            })
        return result

    except Exception as e:
        print("Walmart Fetch Exception:", e)
        return []
