import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

function ProductGrid({ products, platform, page, setPage, RESULTS_PER_PAGE }) {
  const totalPages = Math.ceil(products.length / RESULTS_PER_PAGE);
  const current = products.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);

  return (
    <>
      <div className="product-grid">
        {current.map((product, i) => (
          <ProductCard key={`${platform}-${i}`} product={product} platform={platform} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
}

export default ProductGrid;
