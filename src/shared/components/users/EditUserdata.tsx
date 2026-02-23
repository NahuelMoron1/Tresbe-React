import { sileo } from "sileo";
import { useUser } from "../../hooks/User";
import "./EditUserdata.css";
import type { Userdata } from "../../models/User";

export default function EditUserdata() {
  const { userdata, edit_userdata } = useUser();

  const hasChanges = (newData: Record<string, any>) => {
    if (!userdata) return false;

    // Obtenemos las llaves de los campos que estamos editando
    const keys = Object.keys(newData);

    // Verificamos si al menos uno es diferente al original
    return keys.some((key) => {
      const originalValue = (userdata as any)[key];
      const newValue = newData[key];

      // Convertimos a String para comparar (útil para números como streetNumb)
      return String(originalValue) !== String(newValue);
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData) as unknown as Userdata;
    if (!hasChanges(updatedData)) {
      return;
    }

    const res = await edit_userdata(updatedData);
    if (!res.modified) {
      sileo.error({
        title: "Algo salió mal",
        description: res.message,
        fill: "black",
      });
      return;
    }
    sileo.success({
      title: res.message,
      fill: "black",
    });
  };

  if (!userdata) return <div className="loading">Cargando...</div>;

  return (
    <div className="edit-profile-wrapper">
      <div className="container">
        <header className="edit-header">
          <h1>Editar Información</h1>
          <p>Modifica tus datos de contacto y facturación</p>
        </header>

        <form className="edit-form-card" onSubmit={handleSave}>
          <div className="form-section">
            <h3>Datos Personales</h3>
            <div className="input-grid">
              <div className="input-field">
                <label>Nombre</label>
                <input
                  name="firstname"
                  type="text"
                  defaultValue={userdata.firstname}
                  required
                />
              </div>
              <div className="input-field">
                <label>Apellido</label>
                <input
                  name="lastname"
                  type="text"
                  defaultValue={userdata.lastname}
                  required
                />
              </div>
              <div className="input-field">
                <label>Empresa</label>
                <input
                  name="company"
                  type="text"
                  defaultValue={userdata.company}
                />
              </div>
              <div className="input-field">
                <label>Teléfono</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={userdata.phone}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Ubicación</h3>
            <div className="input-grid">
              <div className="input-field">
                <label>País</label>
                <input
                  name="country"
                  type="text"
                  defaultValue={userdata.country}
                  required
                />
              </div>
              <div className="input-field">
                <label>Provincia</label>
                <input
                  name="province"
                  type="text"
                  defaultValue={userdata.province}
                  required
                />
              </div>
              <div className="input-field">
                <label>Ciudad</label>
                <input
                  name="city"
                  type="text"
                  defaultValue={userdata.city}
                  required
                />
              </div>
              <div className="input-field">
                <label>Calle</label>
                <input
                  name="street"
                  type="text"
                  defaultValue={userdata.street}
                  required
                />
              </div>
              <div className="input-field">
                <label>Número</label>
                <input
                  name="streetNumb"
                  type="number"
                  defaultValue={userdata.streetNumb}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
