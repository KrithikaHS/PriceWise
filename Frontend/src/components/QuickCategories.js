
function QuickCategories({ setSearch, handleSearch }) {
  const items = ["iPhone", "Samsung", "Laptop", "Smartwatch", "Headphones"];

  return (
    <div className="quick-categories">
      {items.map((item) => (
        <button key={item} className="quick-category-button" onClick={() => {
          setSearch(item);
          handleSearch(item);
        }}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default QuickCategories;
