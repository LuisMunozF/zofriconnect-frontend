import { useEffect, useState } from "react";
import api from "../api/axios";

 // ------------------------
  // Nuevo y funcionales
  // ------------------------

export default function PanelAdmin() {
  const [usuario, setUsuario] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Leer usuario desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        setUsuario(JSON.parse(stored));
      } catch (e) {
        console.error("Error al parsear usuario en PanelAdmin:", e);
      }
    }
  }, []);

  // Cargar empresas desde el backend
  const cargarEmpresas = () => {
    setLoading(true);
    setErr("");

    api
      .get("/empresas/")
      .then((res) => {
        const data = res.data?.results || res.data;
        setEmpresas(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
        setErr("No se pudieron cargar las empresas.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (usuario?.rol === "ADMIN") {
      cargarEmpresas();
    }
  }, [usuario]);

  // Acciones aprobar / rechazar
  const aprobar = async (id) => {
    try {
      await api.post(`/empresas/${id}/aprobar/`);
      cargarEmpresas();
    } catch (e) {
      console.error(e);
      alert("No se pudo aprobar la empresa.");
    }
  };

  const rechazar = async (id) => {
    try {
      await api.post(`/empresas/${id}/rechazar/`);
      cargarEmpresas();
    } catch (e) {
      console.error(e);
      alert("No se pudo marcar la empresa como no aprobada.");
    }
  };

  // --------- VISTAS SEGÚN SESIÓN / ROL ---------

  if (!usuario) {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-warning text-center">
            <h4 className="fw-bold mb-2">Sesión requerida</h4>
            <p className="mb-0">
              Debes iniciar sesión como <strong>administrador</strong> para
              acceder a este panel.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (usuario.rol !== "ADMIN") {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-danger text-center">
            <h4 className="fw-bold mb-2">Acceso restringido</h4>
            <p className="mb-1">
              Tu rol actual es:{" "}
              <strong className="text-uppercase">{usuario.rol}</strong>.
            </p>
            <p className="mb-0">
              Solo cuentas con rol <strong>ADMIN</strong> pueden acceder al
              panel de administración.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ---------- PANEL ADMIN (ROL = ADMIN) ----------

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Encabezado */}
        <header className="mb-4">
          <span className="badge bg-dark-subtle text-dark mb-2">
            Panel de administración
          </span>
          <h1 className="fw-bold text-primary mb-1">
            Administración ZofriConnect
          </h1>
          <p className="text-muted mb-0">
            Desde este panel puedes gestionar el estado de aprobación de las
            empresas usuarias que participan en el catálogo mayorista.
          </p>
        </header>

        {/* Estado de carga / error */}
        {err && <div className="alert alert-danger mb-3">{err}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="text-muted mb-0">
              Cargando empresas registradas...
            </p>
          </div>
        ) : (
          <section className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-primary mb-0">
                  Empresas registradas
                </h4>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={cargarEmpresas}
                >
                  Actualizar listado
                </button>
              </div>

              {empresas.length === 0 ? (
                <p className="text-muted mb-0">
                  No hay empresas registradas aún en el sistema.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th className="text-center">Aprobada</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empresas.map((e) => (
                        <tr key={e.id}>
                          <td>{e.nombre}</td>
                          <td>{e.telefono || "-"}</td>
                          <td>{e.direccion || "-"}</td>
                          <td className="text-center">
                            {e.aprobada ? (
                              <span className="badge bg-success">Sí</span>
                            ) : (
                              <span className="badge bg-warning text-dark">
                                No
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            {e.aprobada ? (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => rechazar(e.id)}
                              >
                                Marcar no aprobada
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => aprobar(e.id)}
                              >
                                Aprobar empresa
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
