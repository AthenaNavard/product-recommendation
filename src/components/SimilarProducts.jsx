import ProductCard from "./ProductCard";

const SimilarProducts = ({ products, onSelect }) => {
  if (products.length === 0) return null;

  return (
    <div className="similar-section">
      <h2>✨ Similar Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
