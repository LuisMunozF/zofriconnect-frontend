import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MisCotizaciones() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [detalleCotizacion, setDetalleCotizacion] = useState(null);

  const token = localStorage.getItem("token_access");

  useEffect(() => {
    const cargarCotizaciones = () => {
      api
        .get("/cotizaciones/mis_cotizaciones/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) => setItems(r.data || []))
        .catch(() => setErr("No se pudieron cargar tus cotizaciones."))
        .finally(() => setLoading(false));
    };

    cargarCotizaciones(); 
    const intervalo = setInterval(cargarCotizaciones, 5000);
    return () => clearInterval(intervalo);
  }, [token]);

  const actualizarEstado = async (cotizacionId, nuevoEstado) => {
    try {
      let endpoint = `/cotizaciones/${cotizacionId}/`;
      if (nuevoEstado === "aceptada") endpoint += "aceptar/";
      else if (nuevoEstado === "cancelada") endpoint += "cancelar/";
      else if (nuevoEstado === "rechazada") endpoint += "rechazar/";

      await api.patch(endpoint, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(items.map(c =>
        c.id === cotizacionId ? { ...c, estado: nuevoEstado } : c
      ));

      if (detalleCotizacion && detalleCotizacion.id === cotizacionId) {
        setDetalleCotizacion({ ...detalleCotizacion, estado: nuevoEstado });
      }

      alert(
        nuevoEstado === "aceptada"
          ? "Cotización aceptada ✅"
          : "Cotización cancelada/rechazada ❌"
      );
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar la cotización ❌");
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

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="fw-bold text-primary mb-3">Mis cotizaciones</h1>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        )}

        {!loading && err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && items.length === 0 && (
          <div className="alert alert-info">Aún no has enviado cotizaciones.</div>
        )}

        {!loading && !err && items.length > 0 && (
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Empresa</th>
                      <th>Mensaje enviado</th>
                      <th>Estado</th>
                      <th>Respuesta empresa</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c) => (
                      <tr key={c.id}>
                        <td>{new Date(c.fecha).toLocaleString()}</td>
                        <td>{c.empresa_nombre}</td>
                        <td>{c.mensaje}</td>
                        <td>
                          <span className={`badge ${getBadgeClass(c.estado)}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td>
                          {c.respuesta ? (
                            <div className="alert alert-success p-2 mb-0">
                              {c.respuesta}
                              <div className="small text-muted mt-1">
                                Respondida el{" "}
                                {new Date(c.fecha_respuesta).toLocaleString()}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted">Aún sin respuesta</span>
                          )}
                        </td>
                        <td>
                          {c.estado === "pendiente" && (
                            <button
                              className="btn btn-sm btn-outline-danger me-2"
                              onClick={() => actualizarEstado(c.id, "cancelada")}
                            >
                              Cancelar
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setDetalleCotizacion(c)}
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {detalleCotizacion && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Cotización #{detalleCotizacion.id}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDetalleCotizacion(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Fecha:</strong> {new Date(detalleCotizacion.fecha).toLocaleString()}</p>
                  <p><strong>Empresa:</strong> {detalleCotizacion.empresa_nombre}</p>
                  <p><strong>Mensaje:</strong> {detalleCotizacion.mensaje}</p>
                  <p><strong>Producto:</strong> {detalleCotizacion.producto.nombre}</p>
                  <p><strong>Cantidad:</strong> {detalleCotizacion.cantidad}</p>
                  <p><strong>Precio unitario:</strong> ${detalleCotizacion.precio_unitario}</p>
                  <p><strong>Subtotal:</strong> ${detalleCotizacion.subtotal}</p>
                  <p><strong>IVA:</strong> ${detalleCotizacion.iva}</p>
                  <p><strong>Total:</strong> ${detalleCotizacion.total}</p>
                  <p>
                    <strong>Estado:</strong>{" "}
                    <span className={`badge ${getBadgeClass(detalleCotizacion.estado)}`}>
                      {detalleCotizacion.estado}
                    </span>
                  </p>
                  {detalleCotizacion.respuesta && (
                    <div className="alert alert-success mb-3">
                      <strong>Respuesta empresa:</strong> {detalleCotizacion.respuesta}
                      <div className="small text-muted">
                        Respondida el {new Date(detalleCotizacion.fecha_respuesta).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  {detalleCotizacion.respuesta && detalleCotizacion.estado === "respondida" && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => actualizarEstado(detalleCotizacion.id, "aceptada")}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => actualizarEstado(detalleCotizacion.id, "rechazada")}
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-secondary"
                    onClick={() => setDetalleCotizacion(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
