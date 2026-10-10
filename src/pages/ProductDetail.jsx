import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../services/api";
import { useApp } from "../context/AppContext";
import SimilarProducts from "../components/SimilarProducts";

const ProductDetail = ({ product, onBack, onSelectProduct }) => {
  const [similar, setSimilar] = useState([]);
  const { addToCart } = useApp();

  useEffect(() => {
    const loadSimilar = async () => {
      try {
        const data = await fetchProductsByCategory(product.category);
        setSimilar(data.filter((p) => p.id !== product.id));
      } catch (error) {
        console.error(error);
      }
    };
    loadSimilar();
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <div className="container">
      <button className="back-btn" onClick={onBack}>
        ← Back to Products
      </button>

      <div className="product-detail">
        <img src={product.image} alt={product.title} className="detail-image" />
        <div className="detail-info">
          <div className="product-category">{product.category}</div>
          <h1>{product.title}</h1>
          <div className="detail-price">${product.price.toFixed(2)}</div>
          <p className="detail-description">{product.description}</p>
          <button className="add-btn" onClick={() => addToCart(product)}>
            🛒 Add to Cart
          </button>
        </div>
      </div>

      <SimilarProducts products={similar} onSelect={onSelectProduct} />
    </div>
  );
};

export default ProductDetail;
