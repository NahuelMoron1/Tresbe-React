import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "sileo";
import { lazy, Suspense } from "react";

// Importación normal (SIN lazy) para que el usuario la vea al instante
import NavBar from "./shared/components/navbar/NavBar";
import ErrorBoundary from "./shared/components/errors/ErrorBoundary";

// Importaciones con Lazy
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
const OrdersList = lazy(() => import("./shared/components/orders/OrdersList"));

function App() {
  return (
    <Router>
      <Toaster position="top-right" offset={80} />

      {/* La NavBar queda fija, no depende del Suspense */}
      <NavBar />

      {/* Solo el contenido de las rutas mostrará el Loading al navegar */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="loading-container">Loading...</div>}
        >
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productID" element={<ProductItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditUserdata />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrdersList />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
