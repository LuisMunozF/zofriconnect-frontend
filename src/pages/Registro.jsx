import React, { useState } from "react";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (formData.password !== formData.confirmarPassword) {
      setMensaje("⚠️ Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("https://zofriconnect.netlify.app/Registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setMensaje("✅ Usuario registrado exitosamente.");
        setFormData({ nombre: "", correo: "", password: "", confirmarPassword: "" });
      } else {
        const data = await response.json();
        setMensaje(`❌ Error: ${data.detail || "No se pudo registrar el usuario."}`);
      }
    } catch (error) {
      setMensaje("🚫 Error de conexión con el servidor.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre completo</label>
          <input type="text" className="form-control" id="nombre" placeholder="Ej: Juan Pérez" value={formData.nombre} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="correo" placeholder="tuemail@ejemplo.com" value={formData.correo} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" placeholder="********" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmarPassword" className="form-label">Confirmar contraseña</label>
          <input type="password" className="form-control" id="confirmarPassword" placeholder="********" value={formData.confirmarPassword} onChange={handleChange} required />
        </div>

        {mensaje && <p className="text-center mt-2">{mensaje}</p>}

        <button type="submit" className="btn btn-success w-100">Registrarse</button>

        <p className="text-center mt-3 mb-0">
          ¿Ya tienes una cuenta?{" "}
          <a href="/Login" className="text-primary text-decoration-none">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  );
}

//holacomoestas