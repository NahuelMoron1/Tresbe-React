import { Link } from "react-router-dom";
import "./NavBar.css";
export function NavBar() {
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
      </ul>
    </nav>
  );
}
