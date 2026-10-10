import { useEffect, useState, useMemo } from "react";
import { fetchProducts, fetchCategories } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import { useApp } from "../context/AppContext";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import SearchBar from "../components/SearchBar";
import PriceFilter from "../components/PriceFilter";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";

const Home = ({ onSelectProduct }) => {
  const [products, setProducts] = useState(() =>
    loadFromStorage("products", []),
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { priceRange, setPriceRange, selectedCategory, setSelectedCategory } =
    useApp();

  // دریافت محصولات
  useEffect(() => {
    const loadData = async () => {
      if (products.length > 0) return; // اگر در LocalStorage بود، API صدا نزن

      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        saveToStorage("products", productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // فیلتر محصولات
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [products, debouncedSearch, priceRange, selectedCategory]);

  return (
    <div className="container">
      <div className="filters-section">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <PriceFilter
          range={priceRange}
          onChange={setPriceRange}
          maxPrice={1000}
        />
      </div>

      {loading ? (
        <div className="loading">⏳ Loading products...</div>
      ) : (
        <ProductList products={filteredProducts} onSelect={onSelectProduct} />
      )}
    </div>
  );
};

export default Home;
