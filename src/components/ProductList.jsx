import ProductCard from "./ProductCard";

const ProductList = ({ products, onSelect }) => {
  if (products.length === 0) {
    return (
      <div className="loading">😕 No products found. Try changing filters.</div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ProductList;
