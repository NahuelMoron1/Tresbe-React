import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Este método se dispara cuando hay un error
  public static getDerivedStateFromError(error: Error): State {
    if (error.message.includes("Loading chunk")) {
      window.location.reload(); // Recarga automática si falló el lazy load
    }
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error capturado en el Boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Aquí puedes poner el diseño que quieras para el error
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>¡Ups! Algo salió mal al cargar esta sección.</h2>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
