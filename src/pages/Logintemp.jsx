import { useState } from "react";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ Inicio de sesión exitoso");
        localStorage.setItem("usuario", data.user);

        window.location.href = "/";
      } else {
        setMensaje("❌ " + (data.error || "Error al iniciar sesión"));
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3 text-primary">Iniciar Sesión</h3>

        {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

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

        <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>

        <p className="text-center mt-3 mb-0">
          ¿No tienes una cuenta?{" "}
          <a href="/Registro" className="text-primary text-decoration-none">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}
