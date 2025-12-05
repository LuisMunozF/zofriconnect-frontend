import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CotizacionesEmpresa() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token_access");
    const storedUser = JSON.parse(localStorage.getItem("usuario") || "{}");

    if (!token || storedUser.rol !== "EMPRESA") {
      setErr("Debes iniciar sesión como EMPRESA para ver tus cotizaciones.");
      setLoading(false);
      return;
    }

    api
      .get("/cotizaciones/de_mi_empresa/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        setItems(r.data || []);
      })
      .catch(() => {
        setErr("No se pudieron cargar las cotizaciones recibidas.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="fw-bold text-primary mb-3">Cotizaciones recibidas</h1>
        <p className="text-muted">
          Revisa las solicitudes enviadas por compradores mayoristas a tu empresa.
        </p>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted">Cargando cotizaciones...</p>
          </div>
        )}

        {!loading && err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && items.length === 0 && (
          <div className="alert alert-info">
            No tienes cotizaciones recibidas por el momento.
          </div>
        )}

        {!loading && !err && items.length > 0 && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Listado de cotizaciones</h5>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Solicitante</th>
                      <th>Mensaje</th>
                      <th>Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((c) => (
                      <tr key={c.id}>
                        <td>{new Date(c.fecha).toLocaleString()}</td>
                        <td>{c.solicitante}</td>
                        <td>{c.mensaje || "(Sin mensaje)"}</td>
                        <td>
                          <span className="badge bg-secondary">{c.estado}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="small text-muted mt-3">
                Más adelante podrás marcar cotizaciones como "vistas" o "respondidas".
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}