const PriceFilter = ({ range, onChange, maxPrice = 1000 }) => {
  const [minVal, maxVal] = range;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 10);
    onChange([value, maxVal]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 10);
    onChange([minVal, value]);
  };

  const minPercent = (minVal / maxPrice) * 100;
  const maxPercent = (maxVal / maxPrice) * 100;

  return (
    <div className="filter-group">
      <label>💰 Price Range</label>
      <div className="dual-range-wrapper">
        <div className="dual-range-track">
          <div
            className="dual-range-fill"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={minVal}
          onChange={handleMinChange}
          className="dual-range-input dual-range-min"
        />
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={maxVal}
          onChange={handleMaxChange}
          className="dual-range-input dual-range-max"
        />
      </div>
      <div className="price-values">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
