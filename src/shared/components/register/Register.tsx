import { Link } from "react-router-dom";
import { useUser } from "../../hooks/User";
import "./Register.css";

export default function Register() {
  const { user } = useUser();

  if (user != null) {
    window.location.href = "/";
    return;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Aquí podrías validar que las contraseñas coincidan antes de enviar
    console.log("Datos de registro:", data);
    // TODO: Llamar a tu función de register(data)
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-header">
          <h1>Crea tu cuenta</h1>
          <p>Únete a nuestra distribuidora y accede a beneficios exclusivos</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="juanperez"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Registrarse
          </button>
        </form>

        <div className="register-footer">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
