import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProductsPage } from "./pages/ProductsPage";
import { NavBar } from "./shared/components/NavBar";
import { ProductItem } from "./shared/components/products/productItem/ProductItem";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productID" element={<ProductItem />} />
      </Routes>
    </Router>
  );
}

export default App;
