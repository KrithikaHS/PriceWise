
function FilterPanel({ filter, setFilter, onClose }) {
  const options = ["lowestPrice", "highestRating", "bestCombo", "none"];

  return (
    <div className="filter-side-panel">
      <h3>Filter Options</h3>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="radio"
            name="filter"
            checked={filter === opt}
            onChange={() => setFilter(opt)}
          />
          {opt.replace(/([A-Z])/g, " $1")}
        </label>
      ))}
      <button className="update-results-button" onClick={onClose}>Close Filters</button>
    </div>
  );
}

export default FilterPanel;
