import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useMemo } from "react";
import { useUser } from "../../hooks/User";
import { useCart } from "../../hooks/Cart";
export default function NavBar() {
  const { cart } = useCart();
  const { user, get_user_logged, logout } = useUser();

  const totalItems = useMemo(() => {
    return cart.length;
  }, [cart]);

  useEffect(() => {
    get_user_logged();
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
          {user == null && <Link to={"/login"}>Login</Link>}{" "}
          {user != null && (
            <Link to={"/"} onClick={logout}>
              LOGOUT
            </Link>
          )}
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

        {user != null && (
          <li>
            <Link to="/profile" className="action-link">
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="nav-icon"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
