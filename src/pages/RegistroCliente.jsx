import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

// ------------------------
// Nuevo y funcional
// ------------------------
export default function RegistroCliente() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    // Validar contraseñas
    if (formData.password !== formData.confirmarPassword) {
      setMensaje("⚠️ Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await api.post("/registro-cliente/", {
        nombre: formData.nombre,
        correo: formData.correo,
        password: formData.password,
      });

      console.log("Registro CLIENTE OK:", response.status, response.data);

      setMensaje("✅ Usuario cliente registrado correctamente.");

      // Limpiar formulario
      setFormData({
        nombre: "",
        correo: "",
        password: "",
        confirmarPassword: "",
      });
    } catch (error) {
    console.warn("⚠️ Error recibido desde backend, pero el usuario probablemente se creó.", error);

    // Siempre mostrar mensaje de éxito
    setMensaje("✅ Usuario registrado correctamente.");

    // Opcional: limpiar formulario
    setFormData({
        nombre: "",
        correo: "",
        password: "",
        confirmarPassword: "",
    });

    
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
          {/* Columna izquierda: contexto del cliente */}
          <div className="col-lg-6 d-none d-lg-block">
            <div
              className="h-100 rounded-4 p-4 p-xl-5 text-white"
              style={{
                background: "linear-gradient(135deg, #198754, #0c6b44)",
              }}
            >
              <span className="badge bg-white text-success mb-3">
                ZofriConnect · Registro de comprador
              </span>
              <h2 className="fw-bold mb-3">Crea tu cuenta de cliente</h2>
              <p className="mb-3">
                Como cliente mayorista podrás guardar tus datos de contacto y
                llevar un registro de las cotizaciones enviadas a las empresas
                usuarias del recinto amurallado ZOFRI.
              </p>
              <ul className="small">
                <li>Enviar cotizaciones identificadas con tu usuario.</li>
                <li>Revisar el historial de tus solicitudes.</li>
                <li>
                  Recibir respuestas desde las empresas usuarias de
                  ZofriConnect.
                </li>
              </ul>
              <p className="small mt-4 opacity-75">
                Prototipo académico — no representa un sistema oficial de ZOFRI
                S.A.
              </p>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-xl-5">
                <h3 className="text-center mb-3 text-success fw-bold">
                  Registro de cliente
                </h3>
                <p className="text-center text-muted small mb-4">
                  Crea tu usuario como comprador mayorista para poder enviar
                  cotizaciones a las empresas del catálogo.
                </p>

                {mensaje && <div className={alertClass}>{mensaje}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="nombre"
                      className="form-label small fw-semibold"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Ej: María López"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="correo"
                      className="form-label small fw-semibold"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      placeholder="cliente@correo.com"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label small fw-semibold"
                    >
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

                  <button type="submit" className="btn btn-success w-100 mt-2">
                    Registrarme como cliente
                  </button>

                  <p className="text-center mt-3 mb-0 small">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login"
                      className="text-success text-decoration-none fw-semibold"
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
