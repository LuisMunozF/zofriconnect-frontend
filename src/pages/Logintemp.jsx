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

        // Si usas JWT, puedes guardar el token aquí
        // localStorage.setItem("token", response.data.access);
        // localStorage.setItem("usuario", JSON.stringify(response.data.user));

        setTimeout(() => {
          window.location.href = "/empresa"; // sugerencia: ir al panel empresa
        }, 600);
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

  // Estilo dinámico del mensaje
  let alertClass = "";
  if (mensaje) {
    if (mensaje.startsWith("✅")) alertClass = "alert alert-success text-center";
    else alertClass = "alert alert-danger text-center";
  }

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row g-4 align-items-center justify-content-center">

          {/* COLUMNA IZQUIERDA — CONTEXTO */}
          <div className="col-lg-6 d-none d-lg-block">
            <div
              className="h-100 rounded-4 p-4 p-xl-5 text-white"
              style={{
                background: "linear-gradient(135deg, #004aad, #0066cc)",
              }}
            >
              <span className="badge bg-white text-primary mb-3">
                ZofriConnect · Acceso empresas
              </span>

              <h2 className="fw-bold mb-3">Inicia sesión en ZofriConnect</h2>

              <p className="mb-3">
                Este acceso está diseñado para representantes de empresas
                usuarias del recinto amurallado ZOFRI, permitiendo:
              </p>

              <ul className="small">
                <li>Gestionar el catálogo mayorista de tu empresa.</li>
                <li>Recibir solicitudes de cotización B2B.</li>
                <li>Actualizar información comercial y de ubicación.</li>
              </ul>

              <p className="small mt-4 opacity-75 mb-0">
                Prototipo académico — no representa un sistema oficial de ZOFRI S.A.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA — FORMULARIO */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-xl-5">

                <h3 className="text-center mb-3 text-primary fw-bold">
                  Iniciar sesión
                </h3>

                <p className="text-muted small text-center mb-4">
                  Ingresa tu correo y contraseña registrados para acceder a tu panel.
                </p>

                {mensaje && <div className={alertClass}>{mensaje}</div>}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="tuemail@empresa.cl"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-2">
                    Iniciar sesión
                  </button>

                  <p className="text-center mt-3 mb-0 small">
                    ¿No tienes una cuenta?{" "}
                    <Link
                      to="/registro"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Regístrate aquí
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
