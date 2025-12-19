import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
// ------------------------
// Nuevo y funcional
// ------------------------
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

        // 1) Guardar tokens y usuario en localStorage
        const { access, refresh, user } = response.data || {};

        if (access) {
          localStorage.setItem("token_access", access);
        }
        if (refresh) {
          localStorage.setItem("token_refresh", refresh);
        }
        if (user) {
          localStorage.setItem("usuario", JSON.stringify(user));
        }

        // 2) Redirigir según rol
        const rol = user?.rol;

        if (rol === "EMPRESA") {
          window.location.href = "/empresa";
        } else if (rol === "ADMIN") {
          // Más adelante crearemos un panel admin, por ahora lo dejamos al inicio
          // window.location.href = "/admin-panel";  // cuando lo tengamos
          window.location.href = "/";
        } else {
          // CLIENTE u otro → inicio
          window.location.href = "/";
        }
      } else {
        setMensaje("❌ Error al iniciar sesión");
      }
    } catch (error) {
  console.error("Error en login:", error?.response?.data || error.message);

  const detail =
    error?.response?.data?.detail ||
    error?.response?.data?.error ||
    error?.response?.data?.message ||
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
        className="border p-4 rounded shadow-sm bg-light"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-primary">Acceso empresas</h3>

        {mensaje && (
          <div className="alert alert-info text-center py-2">{mensaje}</div>
        )}

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tuempresa@correo.cl"
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
            placeholder="********"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>

        <p className="text-center mt-3 mb-0">
          ¿Tu empresa aún no tiene acceso?{" "}
          <Link to="/registro" className="text-primary text-decoration-none">
            Regístrala aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
