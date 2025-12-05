import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MisCotizaciones() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token_access");
    const storedUser = localStorage.getItem("usuario");

    if (!token || !storedUser) {
      setErr(
        "Debes iniciar sesión como CLIENTE para ver el historial de tus cotizaciones."
      );
      setLoading(false);
      return;
    }

    let usuario = null;
    try {
      usuario = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error al leer usuario:", e);
    }

    if (!usuario || usuario.rol !== "CLIENTE") {
      setErr(
        "Tu usuario actual no es CLIENTE. Cierra sesión e ingresa con una cuenta de cliente."
      );
      setLoading(false);
      return;
    }

    api
      .get("/cotizaciones/mis_cotizaciones/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        setItems(r.data || []);
      })
      .catch((e) => {
        console.error(e);
        setErr("No se pudieron cargar tus cotizaciones.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        <header className="mb-4">
          <span className="badge bg-success-subtle text-success mb-2">
            Módulo · Cliente mayorista
          </span>
          <h1 className="fw-bold text-success mb-1">Mis cotizaciones</h1>
          <p className="text-muted">
            Revisa las cotizaciones que has enviado a las empresas usuarias de
            ZofriConnect y el estado en que se encuentran.
          </p>
        </header>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success mb-3" role="status" />
            <p className="text-muted">Cargando tus cotizaciones...</p>
          </div>
        )}

        {!loading && err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && items.length === 0 && (
          <div className="alert alert-info">
            Aún no has enviado cotizaciones desde el catálogo. Explora el
            catálogo mayorista y solicita una cotización a alguna empresa.
          </div>
        )}

        {!loading && !err && items.length > 0 && (
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Historial de solicitudes</h5>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Empresa</th>
                      <th>Mensaje</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c) => (
                      <tr key={c.id}>
                        <td>{new Date(c.fecha).toLocaleString()}</td>
                        <td>{c.empresa_nombre || `Empresa #${c.empresa}`}</td>
                        <td>{c.mensaje}</td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            {c.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="small text-muted mt-3 mb-0">
                El estado puede ser, por ejemplo: pendiente, vista o respondida,
                según cómo la gestione la empresa usuaria.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}