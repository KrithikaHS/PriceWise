from math import radians, cos, sin, asin, sqrt, atan2

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def calculate_shipping(userLat, userLon, storeLat, storeLon, platform=None):
    distance = calculate_distance(userLat, userLon, storeLat, storeLon)
    distance = min(distance, 500)
    base = 5
    multiplier = 1.8 if platform == "Walmart" else 2.0
    return round(base + distance * multiplier)