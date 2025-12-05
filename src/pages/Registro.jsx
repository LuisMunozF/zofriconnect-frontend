import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; 

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar mensaje anterior

    // Verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmarPassword) {
      setMensaje("⚠️ Las contraseñas no coinciden.");
      return;
    }

    try {
      // Hacer la solicitud al backend para crear el usuario
      const response = await api.post("/registro/", {
        nombre: formData.nombre,
        correo: formData.correo,
        password: formData.password,
      });

      // Verificar si la respuesta fue exitosa
      if (response.status === 201 || response.status === 200) {
        setMensaje("✅ Usuario registrado exitosamente.");
        setFormData({
          nombre: "",
          correo: "",
          password: "",
          confirmarPassword: "",
        });
      } else {
        setMensaje("❌ No se pudo registrar el usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      const detail =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        "No se pudo registrar el usuario.";
      setMensaje("❌ Error: " + detail);
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
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre completo
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="tuemail@ejemplo.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmarPassword" className="form-label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmarPassword"
            placeholder="********"
            value={formData.confirmarPassword}
            onChange={handleChange}
            required
          />
        </div>

        {mensaje && <p className="text-center mt-2">{mensaje}</p>}

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>

        <p className="text-center mt-3 mb-0">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-primary text-decoration-none">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
