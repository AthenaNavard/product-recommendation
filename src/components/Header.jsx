import { useApp } from "../context/AppContext";

const Header = ({ onCartClick, onHomeClick }) => {
  const { cartCount } = useApp();

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={onHomeClick}>
          🛍️ Product Recommender
        </div>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
