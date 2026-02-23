import { sileo } from "sileo";
import { useUser } from "../../hooks/User";
import "./Login.css";

export default function Login() {
  const { user, login } = useUser();

  if (user != null) {
    window.location.href = "/";
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const loginInfo = await login(email, password);
    if (loginInfo.logged) {
      window.location.href = "/";
    } else {
      sileo.error({
        title: "Algo salió mal",
        description: loginInfo.message,
        fill: "black",
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h1>Bienvenido</h1>
          <p>Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // Importante: coincide con formData.get("email")
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password" // Importante: coincide con formData.get("password")
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}
