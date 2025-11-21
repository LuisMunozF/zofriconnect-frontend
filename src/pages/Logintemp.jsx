import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await api.post("/login/", { correo, password });

      if (response.status === 200) {
        setMensaje("✅ Inicio de sesión exitoso");

        // Aquí puedes guardar token o usuario si tu backend lo devuelve
        // localStorage.setItem("token_access", response.data.access);
        // localStorage.setItem("usuario", JSON.stringify(response.data.user));

        window.location.href = "/";
      } else {
        setMensaje("❌ Error al iniciar sesión");
      }
    } catch (error) {
      const detail =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        "Error al iniciar sesión";
      setMensaje("❌ " + detail);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="border p-3 rounded shadow-sm bg-light"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3 text-primary">Iniciar Sesión</h3>

        {mensaje && (
          <div className="alert alert-info text-center">{mensaje}</div>
        )}

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>

        <p className="text-center mt-3 mb-0">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-primary text-decoration-none">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
