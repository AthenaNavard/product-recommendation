const SearchBar = ({ value, onChange }) => {
  return (
    <div className="filter-group">
      <label>🔍 Search Products</label>
      <input
        type="text"
        className="search-input"
        placeholder="Type to search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
