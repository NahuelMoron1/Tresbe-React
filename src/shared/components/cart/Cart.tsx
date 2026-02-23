import { useMemo } from "react";
import "./Cart.css";
import { useCart } from "../../hooks/Cart";

export default function Cart() {
  const { addToCart, removeFromCart, clear_cart, discount_quantity, cart } =
    useCart();

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="cart-page-wrapper">
      <div className="container">
        <header className="cart-header">
          <h1>Tu Carrito</h1>
          <button
            className="clear-btn"
            disabled={cart.length === 0}
            onClick={clear_cart}
          >
            Vaciar Carrito
          </button>
        </header>

        <div className="cart-content">
          <div className="cart-items-list">
            {cart.length === 0 ? (
              <p className="empty-msg">
                Tu carrito está vacío. ¡Empieza a comprar!
              </p>
            ) : (
              cart.map((product) => (
                <div key={product.id} className="cart-item">
                  <div className="item-img">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="item-info">
                    <span className="item-brand">{product.brand}</span>
                    <h3>{product.name}</h3>
                    <p className="item-option">{product.optionSelected}</p>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        discount_quantity(product.id, product.optionSelected)
                      }
                    >
                      -
                    </button>
                    <span className="qty-number">{product.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => addToCart(product, product.optionSelected)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    <span>
                      ${(product.price * product.quantity).toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="remove-item-btn"
                    onClick={() =>
                      removeFromCart(product.id, product.optionSelected)
                    }
                    title="Eliminar producto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Resumen de Compra */}
          {cart.length > 0 && (
            <aside className="cart-summary">
              <h2>Resumen</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span className="free-shipping">Gratis</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>${totalAmount.toLocaleString()}</span>
              </div>
              <button className="checkout-btn">Finalizar Compra</button>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
