import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProductsPage } from "./pages/ProductsPage";
import { NavBar } from "./shared/components/navbar/NavBar";
import { ProductItem } from "./shared/components/products/productItem/ProductItem";
import { Toaster } from "sileo";
import { Cart } from "./shared/components/cart/Cart";
import { Login } from "./shared/components/login/Login";

function App() {
  return (
    <Router>
      <Toaster position="top-right" offset={80} />
      <NavBar />
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productID" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
