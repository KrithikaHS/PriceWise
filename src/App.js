// import { useEffect, useState } from "react";
// import "./App.css";



// function App() {
//   const [search, setSearch] = useState("");
//   const [searched, setSearched] = useState(false);
//   const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [sortByPrice, setSortByPrice] = useState(false);
//   const [sortByRating, setSortByRating] = useState(false);
//   const [walmartResults, setWalmartResults] = useState([]);
//   const [amazonResults, setAmazonResults] = useState([]);
//   // ---------------
//  const RESULTS_PER_PAGE = 4;
// const [amazonPage, setAmazonPage] = useState(1);
// const [walmartPage, setWalmartPage] = useState(1);


//   const [loading, setLoading] = useState(false);

//   // -------------------

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//     document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
//   }, [darkMode]);
// // ---------------------------------
//   const handleSearch = async (query = search) => {
//   if (!query.trim()) return;
//   setSearched(true);
//   setLoading(true);

//   // Example mock data (same as before)
//   const mockWalmart = [
//     { name: "Apple iPhone 14", salePrice: "₹78,999", rating: 4.6 },
//     { name: "Samsung Galaxy S23", salePrice: "₹68,499", rating: 4.4 },
//     { name: "Google Pixel 7", salePrice: "₹58,499", rating: 4.2 },
//     { name: "Apple iPhone 14", salePrice: "₹78,999", rating: 4.6 },
//     { name: "Samsung Galaxy S23", salePrice: "₹68,499", rating: 4.4 },
//     { name: "Google Pixel 7", salePrice: "₹58,499", rating: 4.2 },
//     { name: "Apple iPhone 14", salePrice: "₹78,999", rating: 4.6 },
//     { name: "Samsung Galaxy S23", salePrice: "₹68,499", rating: 4.4 },
//     { name: "Google Pixel 7", salePrice: "₹58,499", rating: 4.2 },
//   ];
//   const mockAmazon = [
//     { title: "iPhone 14", price: "₹79,999", rating: 4.5 },
//     { title: "Samsung Galaxy S23", price: "₹69,999", rating: 4.3 },
//     { title: "Google Pixel 7", price: "₹59,999", rating: 4.4 },
//     { title: "iPhone 14", price: "₹79,999", rating: 4.5 },
//     { title: "Samsung Galaxy S23", price: "₹69,999", rating: 4.3 },
//     { title: "Google Pixel 7", price: "₹59,999", rating: 4.4 },
//     { title: "iPhone 14", price: "₹79,999", rating: 4.5 },
//     { title: "Samsung Galaxy S23", price: "₹69,999", rating: 4.3 },
//     { title: "Google Pixel 7", price: "₹59,999", rating: 4.4 },
//   ];

//   setWalmartResults(mockWalmart);
//   setAmazonResults(mockAmazon);

//   setLoading(false);
// };



// // ---------------------
//   const toggleDarkMode = () => setDarkMode((prev) => !prev);
//   const toggleFilterPanel = () => setFilterOpen((prev) => !prev);
//   const handleUpdateResults = () => {
//     handleSearch();
//     setFilterOpen(false);
//   };

//   const parsePrice = (price) => parseFloat((price || "").replace(/[₹$,]/g, "")) || 0;

//   const sortProducts = (products) => {
//     let sorted = [...products];
//     if (sortByPrice) {
//       sorted.sort((a, b) => parsePrice(a.price || a.salePrice) - parsePrice(b.price || b.salePrice));
//     }
//     if (sortByRating) {
//       sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//     }
//     return sorted;
//   };
// // ----------------------
// const renderProducts = (products, platform, page, setPage) => {
//   const sorted = sortProducts(products);
//   const totalPages = Math.ceil(sorted.length / RESULTS_PER_PAGE);
//   const start = (page - 1) * RESULTS_PER_PAGE;
//   const currentPageData = sorted.slice(start, start + RESULTS_PER_PAGE);

//   return (
//     <>
//       <div className="product-grid">
//         {currentPageData.map((product, index) => (
//           <div className="product-card" key={`${platform}-${index}`}>
//             {product.image || product.thumbnail ? (
//               <img
//                 src={product.image || product.thumbnail}
//                 alt={product.title || product.name}
//                 className="product-image"
//               />
//             ) : (
//               <div className="no-image">No Image Available</div>
//             )}
//             <h4>{product.title || product.name}</h4>
//             <p><strong>Price:</strong> {product.price || product.salePrice || "N/A"}</p>
//             <p><strong>Rating:</strong> ⭐ {product.rating || "N/A"}</p>
//             {product.link || product.url ? (
//               <a
//                 href={product.link || product.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="buy-button"
//               >
//                 Buy Now on {platform}
//               </a>
//             ) : (
//               <button className="buy-button" disabled>No Link</button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* ✅ Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//           <span>Page {page} of {totalPages}</span>
//           <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
//         </div>
//       )}
//     </>
//   );
// };


//   // ---------------------------

//   return (
//     <div className="page-container">
//       <header className="header">
//         <div className="header-left">
//           <img src="/logo192.png" alt="PriceWise Logo" className="logo" />
//           <h1 className="app-title">PriceWise</h1>
//         </div>
//         <div className="header-center">
//           <input
//             type="text"
//             placeholder="Search products like 'iPhone 14'"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search-input"
//           />
//           <button onClick={handleSearch} className="search-button">Search</button>
//           <button onClick={toggleFilterPanel} className="filter-toggle">Filters</button>
//         </div>
//         <div className="header-right">
//   {/* ------------------------------------ */}
//           <button className="mode-toggle" onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
//   <div className={`toggle-switch ${darkMode ? "dark" : "light"}`}>
//     <div className="switch-handle" />
//   </div>
// </button>
// {/* ------------------------------------ */}
//         </div>
//       </header>
// {/* ---------------- */}
//       <main className="main-content">
//         <div className="quick-categories">
//   {["iPhone", "Samsung", "Laptop", "Smartwatch", "Headphones"].map((item) => (
//     <button
//       key={item}
//       className="quick-category-button"
//       onClick={() => {
//         setSearch(item);         // updates the search bar for UI
//         handleSearch(item);      // uses the clicked value directly
//       }}
//     >
//       {item}
//     </button>
//   ))}
// </div>

// {/* ------------ */}
//         {filterOpen && (
//           <div className="filter-panel">
//             <h3>Filter Options</h3>
//             <label>
//               <input type="checkbox" checked={sortByPrice} onChange={() => setSortByPrice(!sortByPrice)} /> Sort by Price
//             </label>
//             <label>
//               <input type="checkbox" checked={sortByRating} onChange={() => setSortByRating(!sortByRating)} /> Sort by Rating
//             </label>
//             <button className="update-results-button" onClick={handleUpdateResults}>Update Results</button>
//           </div>
//         )}
// {/* ------------------------------- */}
//         {loading && (
//   <div className="friendly-loader">
//    Hold tight! We’re hunting down the best deals for you...
//   </div>
// )}

// {searched && !loading && (
//   <div className="search-results dual-column">
//     <div className="result-section">
//       <h2 className="result-header">Amazon Results</h2>
//       {renderProducts(amazonResults, "Amazon", amazonPage, setAmazonPage)}

//     </div>
//     <div className="result-section">
//       <h2 className="result-header">Walmart Results</h2>
//       {renderProducts(walmartResults, "Walmart", walmartPage, setWalmartPage)}

//     </div>
//   </div>
// )}
// {/* -------------------------------- */}
//       </main>

//       <footer className="footer">
//         <div className="footer-section about">
//           <h3>About PriceWise</h3>
//           <p>Compare products across Amazon, Flipkart, Walmart and get the best deals.</p>
//         </div>
//         <div className="footer-section contact">
//           <h3>Contact Us</h3>
//           <p>Email: support@PriceWise.com</p>
//           <p>Phone: +91 9988776650</p>
//         </div>
//         <div className="footer-section copyright">
//           <p>© 2025 PriceWise. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;



// -------------------------------------------------------------------------
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchData, setSearchData] = useState(null);  // Full backend result
  const [filter, setFilter] = useState("none"); 
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [filterOpen, setFilterOpen] = useState(false);
  const RESULTS_PER_PAGE = 4;
  const [amazonPage, setAmazonPage] = useState(1);
  const [walmartPage, setWalmartPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSearch = async (query = search) => {
    if (!query.trim()) return;
    setSearched(true);
    setFilter("none");
    setSearchData(null);

    try {
      const res = await fetch(`http://localhost:8080/api/search?query=${query}`);
      const data = await res.json();
      setSearchData(data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleFilterPanel = () => setFilterOpen((prev) => !prev);

  // const parsePrice = (price) => parseFloat((price || "").replace(/[₹$,]/g, "")) || 0;

  const getFilteredResults = (platform) => {
    if (!searchData) return [];
    let selectedList = [];

    switch (filter) {
      case "lowestPrice":
        selectedList = searchData.lowestPrice || [];
        break;
      case "highestRating":
        selectedList = searchData.highestRating || [];
        break;
      case "bestCombo":
        selectedList = searchData.bestCombo || [];
        break;
      default:
        selectedList = searchData.allResults || [];
    }

    return selectedList.filter(p => p.platform === platform);
  };

  const renderProducts = (products, platform, page, setPage) => {
    const totalPages = Math.ceil(products.length / RESULTS_PER_PAGE);
    const start = (page - 1) * RESULTS_PER_PAGE;
    const currentPageData = products.slice(start, start + RESULTS_PER_PAGE);

    return (
      <>
        <div className="product-grid">
          {currentPageData.map((product, index) => (
            <div className="product-card" key={`${platform}-${index}`}>
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
          <button onClick={() => handleSearch(search)} className="search-button">Search</button>
          <button onClick={toggleFilterPanel} className="filter-toggle">Filters</button>
        </div>
        <div className="header-right">
          <button className="mode-toggle" onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
  <div className={`toggle-switch ${darkMode ? "dark" : "light"}`}>
     <div className="switch-handle" />
   </div>
 </button>
        </div>
      </header>

      <main className="main-content">
        <div className="quick-categories">
          {["iPhone", "Samsung", "Laptop", "Smartwatch", "Headphones"].map((item) => (
            <button
              key={item}
              className="quick-category-button"
              onClick={() => {
                setSearch(item);
                handleSearch(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {filterOpen && (
          <div className="filter-panel">
            <h3>Filter Options</h3>
            <label>
              <input
                type="radio"
                name="filter"
                checked={filter === "lowestPrice"}
                onChange={() => setFilter("lowestPrice")}
              /> Lowest Price
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                checked={filter === "highestRating"}
                onChange={() => setFilter("highestRating")}
              /> Highest Rating
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                checked={filter === "bestCombo"}
                onChange={() => setFilter("bestCombo")}
              /> Best Combo
            </label>
            <label>
              <input
                type="radio"
                name="filter"
                checked={filter === "none"}
                onChange={() => setFilter("none")}
              /> Clear Filters
            </label>
            <button className="update-results-button" onClick={() => setFilterOpen(false)}>
              Close Filters
            </button>
          </div>
        )}

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

        {searchData?.topRecommendations?.length > 0 && (
          <div className="recommendation-box">
            <h3>Recommended Products</h3>
            {searchData.topRecommendations.map((p, idx) => (
              <div key={idx}>
                <strong>{p.title}</strong> ({p.platform}) – {p.price} ⭐ {p.rating}
              </div>
            ))}
            <p><strong>Best Platform:</strong> {searchData.bestPlatform}</p>
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
