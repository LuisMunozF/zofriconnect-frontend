import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
 // ------------------------
  // Nuevo y funcionales
  // ------------------------
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

    console.log("Registro OK:", response.status, response.data);

    // Si llegamos aquí es porque la respuesta fue 2xx (200, 201, etc.)
    setMensaje("✅ Usuario registrado exitosamente.");

    // Limpiar formulario
    setFormData({
      nombre: "",
      correo: "",
      password: "",
      confirmarPassword: "",
    });
  } catch (error) {
    console.error("Error en la solicitud", error);

    const detail =
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      "No se pudo registrar el usuario.";

    setMensaje("❌ Error: " + detail);
  }
};

  // clase visual para el mensaje
  let alertClass = "";
  if (mensaje) {
    if (mensaje.startsWith("✅")) alertClass = "alert alert-success text-center";
    else if (mensaje.startsWith("⚠️"))
      alertClass = "alert alert-warning text-center";
    else alertClass = "alert alert-danger text-center";
  }

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row g-4 align-items-stretch">
          {/* Columna izquierda: contexto ZofriConnect */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="h-100 rounded-4 p-4 p-xl-5 text-white"
                 style={{
                   background:
                     "linear-gradient(135deg, #004aad, #0066cc)"
                 }}>
              <span className="badge bg-white text-primary mb-3">
                ZofriConnect · Registro de empresa
              </span>
              <h2 className="fw-bold mb-3">Crea tu acceso a ZofriConnect</h2>
              <p className="mb-3">
                Este registro permite que representantes de empresas usuarias del
                recinto amurallado ZOFRI creen su cuenta para gestionar:
              </p>
              <ul className="small">
                <li>Publicación de productos en el catálogo mayorista.</li>
                <li>Recepción de solicitudes de cotización B2B.</li>
                <li>Actualización de datos de contacto y ubicación.</li>
              </ul>
              <p className="small mt-4 opacity-75">
                Prototipo académico — no representa un sistema oficial de ZOFRI S.A.
              </p>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-xl-5">
                <h3 className="text-center mb-3 text-primary fw-bold">
                  Crear cuenta de acceso
                </h3>
                <p className="text-center text-muted small mb-4">
                  Ingresa tus datos como representante de la empresa. Posteriormente
                  podrás asociar la empresa y publicar productos en el catálogo.
                </p>

                {mensaje && <div className={alertClass}>{mensaje}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label small fw-semibold">
                      Nombre completo del representante
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
                    <label htmlFor="correo" className="form-label small fw-semibold">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      placeholder="tuemail@empresa.cl"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-text small">
                      Usaremos este correo para el acceso y notificaciones de cotización.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label small fw-semibold">
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
                    <label
                      htmlFor="confirmarPassword"
                      className="form-label small fw-semibold"
                    >
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

                  <button type="submit" className="btn btn-primary w-100 mt-2">
                    Registrarse
                  </button>

                  <p className="text-center mt-3 mb-0 small">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Inicia sesión aquí
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
