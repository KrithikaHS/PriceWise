
function Header({ search, setSearch, handleSearch, toggleFilterPanel, toggleDarkMode, darkMode }) {
  return (
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
  );
}

export default Header;
