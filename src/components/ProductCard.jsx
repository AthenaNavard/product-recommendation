import { useApp } from "../context/AppContext";

const ProductCard = ({ product, onSelect }) => {
  const { addToCart } = useApp();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <div className="product-title">{product.title}</div>
        <div className="product-category">{product.category}</div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <button className="add-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
