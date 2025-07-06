
function ProductCard({ product, platform }) {
  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.title || "Product"} className="product-image" />
      )}
      <h4>{product.title || product.name}</h4>
      <p><strong>Price:</strong> {product.price || product.salePrice || "N/A"}</p>
      <p><strong>Rating:</strong> ⭐ {product.rating || "N/A"}</p>
      <a href={product.link || product.url || "#"} target="_blank" rel="noopener noreferrer" className="buy-button">
        Buy on {platform}
      </a>
    </div>
  );
}

export default ProductCard;
