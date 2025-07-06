from rapidfuzz import process, fuzz

def fuzzy_filter(query, products, limit=20, score_cutoff=60):
    product_titles = [p["title"] for p in products]
    matches = process.extract(query, product_titles, scorer=fuzz.partial_ratio, limit=limit, score_cutoff=score_cutoff)
    matched_titles = {m[0] for m in matches}
    return [p for p in products if p["title"] in matched_titles]
