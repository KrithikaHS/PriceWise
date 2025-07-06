import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

// Components
import { useRef } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  const smartSuggestionRef = useRef(null); 
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [, setProducts] = useState([]); // still needed to avoid error, can remove if not using
  const [filter, setFilter] = useState("none");
  const [filterOpen, setFilterOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amazonPage, setAmazonPage] = useState(1);
  const [walmartPage, setWalmartPage] = useState(1);
  const RESULTS_PER_PAGE = 4;
useEffect(() => {
    if (searchData?.smartSuggestion) {
      smartSuggestionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchData]);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleFilterPanel = () => setFilterOpen((prev) => !prev);

 const handleSearch = async (query = search) => {
  if (!query.trim()) return;

  setSearched(true);
  setFilter("none");
  setSearchData(null);
  setError("");
  setLoading(true);

  const fetchSearch = async (url, params = {}) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("✅ SearchData:", data);
      setSearchData(data);
    } catch (e) {
      console.error("Search Error:", e);
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => fetchSearch(
        `http://localhost:8000/api/search?query=${query}&userLat=${pos.coords.latitude}&userLon=${pos.coords.longitude}`
      ),
      () => {
        setError("Location disabled, shipping won't show.");
        fetchSearch(`http://localhost:8000/api/search?query=${query}`);
      }
    );
  } else {
    setError("Geolocation not supported.");
    fetchSearch(`http://localhost:8000/api/search?query=${query}`);
  }

  axios.get("http://localhost:8000/api/compare", { params: { query } })
    .then(res => setProducts(res.data))
    .catch(e => console.error("Compare Error:", e));
};


  const getFilteredResults = (platform) => {
    if (!searchData) return [];

    const baseList =
      filter === "lowestPrice" ? searchData.lowestPrice :
      filter === "highestRating" ? searchData.highestRating :
      filter === "bestCombo" ? searchData.bestCombo :
      searchData.allResults || [];

    return baseList.filter(p => p.platform === platform);
  };

  const renderProducts = (products, platform, page, setPage) => {
    const totalPages = Math.ceil(products.length / RESULTS_PER_PAGE);
    const current = products.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);

    return (
      <>
        <div className="product-grid">
          {current.map((product, i) => (
            <div className="product-card" key={`${platform}-${i}`}>
              {product.image && (
                <img src={product.image} alt={product.title || "Product"} className="product-image" />
              )}
              <h4>{product.title || product.name}</h4>
              <p><strong>Price:</strong> {product.price || product.salePrice || "N/A"}</p>
              <p><strong>Rating:</strong> ⭐ {product.rating || "N/A"}</p>
              <a
                href={product.link || product.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="buy-button"
              >
                Buy on {platform}
              </a>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="page-container">
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        toggleDarkMode={toggleDarkMode}
        toggleFilterPanel={toggleFilterPanel}
        darkMode={darkMode}
      />

      <main className="main-content">
        <h2>🔥 Trending Now</h2>
        <div className="quick-categories">
          
          {["iPhone", "Samsung", "Laptop", "Smartwatch", "Headphones"].map((item) => (
            <button key={item} className="quick-category-button" onClick={() => { setSearch(item); handleSearch(item); }}>
              {item}
            </button>
          ))}
        </div>
          <div className="welcome-section">
  <h1>Welcome to <span className="brand">PriceWise</span> 👋</h1>
  <p>Start by searching your favorite product or pick from trending categories below.</p>
  
</div>





        {filterOpen && (
          <div className="filter-panel">
            <h3>Filter Options</h3>
            {["lowestPrice", "highestRating", "bestCombo", "none"].map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name="filter"
                  checked={filter === opt}
                  onChange={() => setFilter(opt)}
                />
                {opt.replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
            <button className="update-results-button" onClick={() => setFilterOpen(false)}>
              Close Filters
            </button>
          </div>
        )}
        <div className="BestThings">
          {searchData?.smartSuggestion && (
          <div className="suggestions-container">
            <div className="smart-suggestion-box highlight-box">
              
              <div>
                <h2>🌟 Best Product to Buy</h2>
                <img
                  src={searchData.smartSuggestion.image}
                  alt={searchData.smartSuggestion.title}
                  className="product-image"
                />
                <h4>{searchData.smartSuggestion.title}</h4>
                <p><strong>Price:</strong> ₹{searchData.smartSuggestion.price}</p>
                <p><strong>Rating:</strong> ⭐ {searchData.smartSuggestion.rating}</p>
                <p><strong>Platform:</strong> {searchData.smartSuggestion.platform}</p>
                <p><strong>Shipping:</strong> {typeof searchData.smartSuggestion.shippingCharge === "string"
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
          </div>
        )}
        {searchData?.topRecommendations?.length > 0 && (
          <div ref={smartSuggestionRef} className="suggestions-container">
            <div className="recommendation-box highlight-box">
              <h2>✨ Smart Suggestions</h2>
              <ul>
                {searchData.topRecommendations.map((p, idx) => (
                  <li key={idx}>
                    <strong>{p.title}</strong> ({p.platform}) – ₹{p.price} ⭐ {p.rating}<br />
                    <strong>Shipping:</strong> {typeof p.shippingCharge === "string" ? p.shippingCharge : `₹${p.shippingCharge}`}
                  </li>
                ))}
              </ul>
              <div className="best-platform">
                ✅ <strong>Best Overall Platform:</strong> {searchData.bestPlatform}
              </div>
            </div>
          </div>
        )}
        </div>

        

        {searched && searchData && (
          <div className="search-results dual-column">
            <div className="result-section">
              <h2 className="result-header">Amazon Results</h2>
              {renderProducts(getFilteredResults("Amazon"), "Amazon", amazonPage, setAmazonPage)}
            </div>
            <div className="result-section">
              <h2 className="result-header">Walmart Results</h2>
              {renderProducts(getFilteredResults("Walmart"), "Walmart", walmartPage, setWalmartPage)}
            </div>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="loading">Loading...</p>}
      </main>

      <Footer />
    </div>
  );
}

export default App;
