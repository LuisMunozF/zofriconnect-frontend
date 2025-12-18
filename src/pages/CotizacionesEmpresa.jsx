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

  const [mensajeToast, setMensajeToast] = useState("");
  const [tipoToast, setTipoToast] = useState("success");
  const [showToast, setShowToast] = useState(false);

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

  useEffect(() => {
    if (cotizacionActiva) {
      setCantidad(cotizacionActiva.cantidad || 1);
      setRespuesta(cotizacionActiva.respuesta || "");
    }
  }, [cotizacionActiva]);

  const mostrarToast = (mensaje, tipo = "success") => {
    setMensajeToast(mensaje);
    setTipoToast(tipo);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const responderCotizacion = async () => {
    if (!respuesta.trim() || respuesta.trim().length < 10) {
      mostrarToast("Debes escribir una respuesta de al menos 10 caracteres.", "danger");
      return;
    }

    try {
      setEnviando(true);
      const { data } = await api.patch(
        `/cotizaciones/${cotizacionActiva.id}/responder/`,
        { respuesta, cantidad },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const subtotal = cotizacionActiva.precio_unitario * cantidad;
      const iva = Math.round(subtotal * 0.19);
      const total = subtotal + iva;

      const actualizada = {
        ...cotizacionActiva,
        respuesta,
        estado: "respondida",
        cantidad,
        subtotal,
        iva,
        total,
        fecha_respuesta: new Date().toISOString(),
      };

      setCotizacionActiva(null);
      setItems(items.map(c =>
        c.id === cotizacionActiva.id ? actualizada : c
      ));

      setRespuesta("");
      setCantidad(1);
      document.getElementById("cerrarModal").click();
      mostrarToast("Cotización respondida ✅", "success");
    } catch (e) {
      console.error(e);
      mostrarToast("No se pudo responder la cotización ❌", "danger");
    } finally {
      setEnviando(false);
    }
  };

  const cancelarCotizacion = async (cotizacionId, estado) => {
    if (estado !== "pendiente") {
      mostrarToast("Solo puedes cancelar cotizaciones pendientes.", "danger");
      return;
    }

    if (!window.confirm("¿Deseas cancelar esta cotización?")) return;

    try {
      await api.patch(
        `/cotizaciones/${cotizacionId}/cancelar/`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(items.map(c =>
        c.id === cotizacionId ? { ...c, estado: "cancelada" } : c
      ));

      mostrarToast("Cotización cancelada ✅", "success");
    } catch (e) {
      console.error(e);
      mostrarToast("No se pudo cancelar la cotización ❌", "danger");
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

  const puedeResponder = (estado) => ["pendiente", "vista"].includes(estado);

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
                                  onClick={() => cancelarCotizacion(c.id, c.estado)}
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
        <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  <div className="mb-2">
                    <span className="badge bg-primary me-2">Solicitante</span>
                    {cotizacionActiva.solicitante}
                  </div>
                  {cotizacionActiva.correo && (
                    <div className="mb-2">
                      <span className="badge bg-info me-2">Correo</span>
                      {cotizacionActiva.correo}
                    </div>
                  )}
                  {cotizacionActiva.telefono && (
                    <div className="mb-2">
                      <span className="badge bg-warning text-dark me-2">Teléfono</span>
                      {cotizacionActiva.telefono}
                    </div>
                  )}

                  <div className="mb-2">
                    <span className="badge bg-success me-2">Producto</span>
                    {cotizacionActiva.producto_nombre}
                  </div>

                  <div className="mb-2">
                    <span className="badge bg-secondary me-2">Mensaje del cliente</span>
                    {cotizacionActiva.mensaje}
                  </div>

                  <div className="mb-3">
                    <span className="badge bg-dark me-2">Precio unitario</span>
                    ${cotizacionActiva.precio_unitario}
                  </div>

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

                  <p><strong>Subtotal:</strong> ${cantidad * cotizacionActiva.precio_unitario}</p>
                  <p><strong>IVA (19%):</strong> ${Math.round(cantidad * cotizacionActiva.precio_unitario * 0.19)}</p>
                  <p><strong>Total:</strong> ${Math.round(cantidad * cotizacionActiva.precio_unitario * 1.19)}</p>

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

      {/* TOAST */}
      {showToast && (
        <div
          className={`toast align-items-center text-bg-${tipoToast} border-0 position-fixed bottom-0 end-0 m-3 show`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{mensajeToast}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}
    </main>
  );
}
