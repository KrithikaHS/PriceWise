import { useEffect, useState } from "react";
import "./App.css";
import dark from './images/dark.png';
import light from './images/light.png';


function App() {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByRating, setSortByRating] = useState(false);
  const [walmartResults, setWalmartResults] = useState([]);
  const [amazonResults, setAmazonResults] = useState([]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setSearched(true);

    try {
      const res = await fetch(`http://localhost:5000/check-api?product=${search}`);
      const data = await res.json();
      setWalmartResults(data.data?.products || []);
    } catch (err) {
      console.error("API Error:", err);
    }

    const mockAmazon = [
      { title: "iPhone 14", price: "₹79,999", rating: 4.5 },
      { title: "Samsung Galaxy S23", price: "₹69,999", rating: 4.3 },
      { title: "Google Pixel 7", price: "₹59,999", rating: 4.4 },
    ];
    setAmazonResults(mockAmazon);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleFilterPanel = () => setFilterOpen((prev) => !prev);
  const handleUpdateResults = () => {
    handleSearch();
    setFilterOpen(false);
  };

  const parsePrice = (price) => parseFloat((price || "").replace(/[₹$,]/g, "")) || 0;

  const sortProducts = (products) => {
    let sorted = [...products];
    if (sortByPrice) {
      sorted.sort((a, b) => parsePrice(a.price || a.salePrice) - parsePrice(b.price || b.salePrice));
    }
    if (sortByRating) {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return sorted;
  };

  const renderProducts = (products, platform) => {
    const sorted = sortProducts(products);
    return (
      <div className="product-grid">
        {sorted.map((product, index) => (
          <div className="product-card" key={`${platform}-${index}`}>
            <h4>{product.title || product.name}</h4>
            <p><strong>Price:</strong> {product.price || product.salePrice || "N/A"}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating || "N/A"}</p>
            <button className="buy-button">Buy on {platform}</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-left">
          <img src="/logo192.png" alt="PriceWise Logo" className="logo" />
          <h1 className="app-title">PriceWise</h1>
        </div>
        <div className="header-center">
          <input
            type="text"
            placeholder="Search products like 'iPhone 14'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
          <button onClick={toggleFilterPanel} className="filter-toggle">Filters</button>
        </div>
        <div className="header-right">
          <button className="mode-toggle" onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            <img src={darkMode ? light : dark} alt="Toggle Mode" className="toggle-icon" />
          </button>
        </div>
      </header>

      <main className="main-content">
        {filterOpen && (
          <div className="filter-panel">
            <h3>Filter Options</h3>
            <label>
              <input type="checkbox" checked={sortByPrice} onChange={() => setSortByPrice(!sortByPrice)} /> Sort by Price
            </label>
            <label>
              <input type="checkbox" checked={sortByRating} onChange={() => setSortByRating(!sortByRating)} /> Sort by Rating
            </label>
            <button className="update-results-button" onClick={handleUpdateResults}>Update Results</button>
          </div>
        )}

        {searched && (
          <div className="search-results dual-column">
            <div className="result-section">
              <h2 className="result-header">Amazon Results</h2>
              {renderProducts(amazonResults, "Amazon")}
            </div>
            <div className="result-section">
              <h2 className="result-header">Walmart Results</h2>
              {renderProducts(walmartResults, "Walmart")}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-section about">
          <h3>About PriceWise</h3>
          <p>Compare products across Amazon, Flipkart, Walmart and get the best deals.</p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@PriceWise.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        <div className="footer-section copyright">
          <p>© 2025 PriceWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
