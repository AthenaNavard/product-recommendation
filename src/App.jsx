import { useState } from "react";
import { AppProvider } from "./context/AppProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  return (
    <AppProvider>
      <Header
        onCartClick={() => setShowCart(true)}
        onHomeClick={() => setSelectedProduct(null)}
      />

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onSelectProduct={setSelectedProduct}
        />
      ) : (
        <Home onSelectProduct={setSelectedProduct} />
      )}

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </AppProvider>
  );
}

export default App;
