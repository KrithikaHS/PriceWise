
function SmartSuggestions({ searchData }) {
  if (!searchData?.topRecommendations?.length) return null;

  return (
    <div>
      <div className="suggestions-container">
         {searchData.smartSuggestion && (
        <div className="smart-suggestion-box highlight-box">
          <h2>🌟 Best Product to Buy</h2>
          <div className="product-card single-suggestion">
            <img
              src={searchData.smartSuggestion.image}
              alt={searchData.smartSuggestion.title}
              className="product-image"
            />
            <h4>{searchData.smartSuggestion.title}</h4>
            <p><strong>Price:</strong> ₹{searchData.smartSuggestion.price}</p>
            <p><strong>Rating:</strong> ⭐ {searchData.smartSuggestion.rating}</p>
            <p><strong>Platform:</strong> {searchData.smartSuggestion.platform}</p>
            <p><strong>Shipping:</strong>{" "}
              {typeof searchData.smartSuggestion.shippingCharge === "string"
                ? searchData.smartSuggestion.shippingCharge
                : `₹${searchData.smartSuggestion.shippingCharge}`}
            </p>
            <a
              href={searchData.smartSuggestion.link}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button"
            >
              Buy Now
            </a>
          </div>
        </div>
      )}
      <div className="recommendation-box highlight-box">
        <h2>✨ Smart Suggestions</h2>
        <ul>
          {searchData.topRecommendations.map((p, idx) => (
            <li key={idx}>
              <strong>{p.title}</strong> ({p.platform}) – ₹{p.price} ⭐ {p.rating}
              <br />
              <strong>Shipping:</strong>{" "}
              {typeof p.shippingCharge === "string"
                ? p.shippingCharge
                : `₹${p.shippingCharge}`}
            </li>
          ))}
        </ul>
        <div className="best-platform">
          ✅ <strong>Best Overall Platform:</strong> {searchData.bestPlatform}
        </div>
      </div>
      </div>
    </div>
  );
}

export default SmartSuggestions;
