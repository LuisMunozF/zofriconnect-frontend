import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CotizacionesEmpresa() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [cotizacionActiva, setCotizacionActiva] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [enviando, setEnviando] = useState(false);

  const token = localStorage.getItem("token_access");

  const cargarCotizaciones = () => {
    setLoading(true);
    api
      .get("/cotizaciones/de_mi_empresa/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setItems(r.data || []))
      .catch(() =>
        setErr("No se pudieron cargar las cotizaciones recibidas.")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario") || "{}");
    const rol = storedUser?.rol;

    if (!token || rol !== "EMPRESA") {
      setErr("Debes iniciar sesión como EMPRESA para ver tus cotizaciones.");
      setLoading(false);
      return;
    }

    cargarCotizaciones();
  }, []);

  const responderCotizacion = async () => {
    if (!respuesta.trim()) {
      alert("Debes escribir una respuesta.");
      return;
    }

    try {
      setEnviando(true);
      const { data } = await api.patch(
        `/cotizaciones/${cotizacionActiva.id}/responder/`,
        { respuesta, cantidad },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const actualizada = {
        ...cotizacionActiva,
        respuesta,
        estado: "respondida",
        cantidad,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        fecha_respuesta: new Date().toISOString(),
      };

      setCotizacionActiva(null);
      setItems(items.map(c =>
        c.id === cotizacionActiva.id ? actualizada : c
      ));

      setRespuesta("");
      setCantidad(1);
      document.getElementById("cerrarModal").click();
    } catch (e) {
      console.error(e);
      alert("No se pudo responder la cotización.");
    } finally {
      setEnviando(false);
    }
  };

  const cancelarCotizacion = async (cotizacionId) => {
    if (!confirm("¿Deseas cancelar esta cotización?")) return;

    try {
      await api.patch(
        `/cotizaciones/${cotizacionId}/`,
        { estado: "cancelada" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(items.map(c =>
        c.id === cotizacionId ? { ...c, estado: "cancelada" } : c
      ));

      alert("Cotización cancelada ✅");
    } catch (e) {
      console.error(e);
      alert("No se pudo cancelar la cotización ❌");
    }
  };

  const getBadgeClass = (estado) => {
    switch (estado) {
      case "respondida":
      case "aceptada":
        return "bg-success";
      case "rechazada":
      case "cancelada":
        return "bg-danger";
      case "vista":
        return "bg-warning text-dark";
      case "pendiente":
        return "bg-secondary";
      default:
        return "bg-secondary";
    }
  };

  const puedeResponder = (estado) => {
    return !["respondida", "aceptada", "rechazada", "cancelada"].includes(estado);
  };

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="fw-bold text-primary mb-3">Cotizaciones recibidas</h1>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        )}

        {!loading && err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && items.length === 0 && (
          <div className="alert alert-info">
            No tienes cotizaciones recibidas.
          </div>
        )}

        {!loading && !err && items.length > 0 && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Solicitante</th>
                      <th>Mensaje</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c) => (
                      <tr key={c.id}>
                        <td>{new Date(c.fecha).toLocaleString()}</td>
                        <td>{c.solicitante}</td>
                        <td>{c.mensaje}</td>
                        <td>
                          <span className={`badge ${getBadgeClass(c.estado)}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td>
                          {puedeResponder(c.estado) && (
                            <>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#modalResponder"
                                onClick={() => setCotizacionActiva(c)}
                              >
                                Responder
                              </button>
                              {c.estado === "pendiente" && (
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => cancelarCotizacion(c.id)}
                                >
                                  Cancelar
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL RESPONDER */}
      <div className="modal fade" id="modalResponder" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Responder cotización</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="cerrarModal"
              />
            </div>
            <div className="modal-body">
              {cotizacionActiva && (
                <>
                  <p><strong>Producto:</strong> {cotizacionActiva.producto.nombre}</p>
                  <p><strong>Precio unitario:</strong> ${cotizacionActiva.precio_unitario}</p>

                  <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                  </div>

                  <p><strong>Subtotal:</strong> ${cotizacionActiva.subtotal}</p>
                  <p><strong>IVA (19%):</strong> ${cotizacionActiva.iva}</p>
                  <p><strong>Total:</strong> ${cotizacionActiva.total}</p>

                  <textarea
                    className="form-control mt-3"
                    rows="4"
                    placeholder="Escribe tu respuesta..."
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              {cotizacionActiva && puedeResponder(cotizacionActiva.estado) && (
                <button className="btn btn-primary" disabled={enviando} onClick={responderCotizacion}>
                  {enviando ? "Enviando..." : "Enviar respuesta"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
