import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../hooks/User";
import { useCart } from "../../hooks/Cart";
export function NavBar() {
  const { cart } = useCart();
  const { user, get_user_logged, logout } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const totalItems = useMemo(() => {
    return cart.length;
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    get_user_logged();
    setLoading(false);
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}> Menu </Link>
        </li>
        <li>
          <Link to={"/products"}>Productos</Link>
        </li>
        <li>
          <Link to={"/about"}>Sobre Nosotros</Link>
        </li>
        <li>
          <Link to={"/services"}>Contacto</Link>
        </li>
        <li>
          {!loading && user == null && <Link to={"/login"}>Login</Link>}{" "}
          {!loading && user != null && <button onClick={logout}>Logout</button>}
        </li>
        <li className="cart-item-container">
          <Link to={"/cart"} className="cart-link">
            <svg
              width={20} // Lo subí a 20 para que se vea mejor en relación al texto
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="cart-icon-svg"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-badge">{totalItems}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
