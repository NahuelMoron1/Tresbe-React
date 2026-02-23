import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sileo";
import { lazy, Suspense } from "react";
import NavBar from "./shared/components/navbar/NavBar";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductItem = lazy(
  () => import("./shared/components/products/productItem/ProductItem"),
);
const Cart = lazy(() => import("./shared/components/cart/Cart"));
const Login = lazy(() => import("./shared/components/login/Login"));
const Profile = lazy(() => import("./shared/components/users/Profile"));
const EditUserdata = lazy(
  () => import("./shared/components/users/EditUserdata"),
);
const Register = lazy(() => import("./shared/components/register/Register"));

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Router>
        <Toaster position="top-right" offset={80} />
        <NavBar />
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productID" element={<ProductItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditUserdata />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
