const CategoryFilter = ({ categories, value, onChange }) => {
  return (
    <div className="filter-group">
      <label>📂 Category</label>
      <select
        className="category-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
