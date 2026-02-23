import { Link } from "react-router-dom";
import { useUser } from "../../hooks/User";
import "./Profile.css";

export default function Profile() {
  const { user, userdata } = useUser();

  if (!user || !userdata)
    return <div className="loading">Cargando perfil...</div>;

  return (
    <div className="profile-wrapper">
      <div className="container">
        <div className="profile-header-main">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal y de contacto</p>
        </div>

        <div className="profile-grid">
          {/* Tarjeta Lateral: Resumen */}
          <aside className="profile-aside">
            <div className="profile-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-name">
              {userdata.firstname} {userdata.lastname}
            </h2>
            <span className="profile-email-badge">{user.email}</span>
            <div className="profile-status">
              <span className="status-indicator"></span> Cuenta Activa
            </div>
          </aside>

          {/* Panel Principal: Detalles */}
          <main className="profile-details-card">
            <section className="profile-section">
              <h3>Información Personal</h3>
              <div className="data-grid">
                <div className="data-item">
                  <label>Empresa</label>
                  <p>{userdata.company || "No especificada"}</p>
                </div>
                <div className="data-item">
                  <label>Teléfono</label>
                  <p>{userdata.phone}</p>
                </div>
                <div className="data-item">
                  <label>ID de Usuario</label>
                  <p className="id-text">{user.id}</p>
                </div>
              </div>
            </section>

            <section className="profile-section">
              <h3>Ubicación y Envío</h3>
              <div className="data-grid">
                <div className="data-item">
                  <label>País</label>
                  <p>{userdata.country}</p>
                </div>
                <div className="data-item">
                  <label>Provincia / Estado</label>
                  <p>{userdata.province}</p>
                </div>
                <div className="data-item">
                  <label>Ciudad</label>
                  <p>{userdata.city}</p>
                </div>
                <div className="data-item">
                  <label>Dirección</label>
                  <p>
                    {userdata.street} {userdata.streetNumb}
                  </p>
                </div>
              </div>
            </section>

            <div className="profile-actions">
              <Link className="edit-profile-btn" to={"/profile/edit"}>
                Editar Información
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
