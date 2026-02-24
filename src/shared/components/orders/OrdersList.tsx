import { useState } from "react";
import { useOrders } from "../../hooks/Orders";
import type { OrderProducts } from "../../models/Orders";
import "./OrdersList.css";

export default function OrdersList() {
  const { orderProducts } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderProducts | null>(
    null,
  );

  if (orderProducts.length === 0) {
    return (
      <div className="orders-empty">
        <p>Aún no tienes pedidos realizados.</p>
      </div>
    );
  }

  return (
    <div className="orders-page-wrapper">
      <div className="container">
        <header className="orders-header">
          <h1>Mis Pedidos</h1>
          <p>Historial de compras y seguimiento de envíos</p>
        </header>

        <div className="orders-container">
          {/* Listado de pedidos (Izquierda) */}
          <aside className="orders-list">
            {orderProducts.map((item) => (
              <div
                key={item.order.id}
                className={`order-item-card ${selectedOrder?.order.id === item.order.id ? "active" : ""}`}
                onClick={() => setSelectedOrder(item)}
              >
                <div className="order-item-header">
                  <span className="order-code">#{item.order.code}</span>
                  <span
                    className={`order-status-pill ${item.order.payed ? "payed" : "pending"}`}
                  >
                    {item.order.payed ? "Pagado" : "Pendiente"}
                  </span>
                </div>
                <div className="order-item-body">
                  <p className="order-date">
                    {new Date(item.order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="order-total-sm">
                    ${item.order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </aside>

          {/* Detalle del pedido (Derecha) */}
          <main className="order-detail-view">
            {selectedOrder ? (
              <div className="detail-content">
                <div className="detail-header">
                  <h2>Detalle del Pedido #{selectedOrder.order.code}</h2>
                  <p>
                    {selectedOrder.order.description ||
                      "Sin descripción adicional"}
                  </p>
                </div>

                <div className="detail-grid">
                  <div className="detail-info-card">
                    <label>Resumen</label>
                    <div className="info-row">
                      <span>Subtotal:</span>{" "}
                      <span>
                        ${selectedOrder.order.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="info-row">
                      <span>Envío:</span>{" "}
                      <span>
                        ${selectedOrder.order.delivery.toLocaleString()}
                      </span>
                    </div>
                    <div className="info-row">
                      <span>Descuento:</span>{" "}
                      <span className="discount">
                        -${selectedOrder.order.discount.toLocaleString()}
                      </span>
                    </div>
                    <div className="info-row total">
                      <span>Total:</span>{" "}
                      <span>${selectedOrder.order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="detail-info-card">
                    <label>Pago y Entrega</label>
                    <p>
                      <strong>Método:</strong>{" "}
                      {selectedOrder.order.typeOfPayment}
                    </p>
                    <p>
                      <strong>Atendido:</strong>{" "}
                      {selectedOrder.order.attended ? "✅ Sí" : "⏳ En espera"}
                    </p>
                  </div>
                </div>

                <div className="products-table-wrapper">
                  <h3>Productos</h3>
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.products.map((prod, index) => (
                        <tr key={index}>
                          <td>{prod.name}</td>
                          <td>${prod.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p>Selecciona un pedido para ver los detalles</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
