import api from "../api/axios";
import { useEffect, useState } from "react";
// ------------------------
// Nuevo y funcional
// ------------------------
export default function Conexion() {
  const [status, setStatus] = useState({
    ok: false,
    message: "Comprobando estado del backend...",
  });

  const [latenciaMs, setLatenciaMs] = useState(null);
  const [ultimaRevision, setUltimaRevision] = useState(null);
  const [cargando, setCargando] = useState(false);

  const comprobarBackend = async () => {
    try {
      setCargando(true);
      setStatus({
        ok: false,
        message: "Comprobando estado del backend...",
      });

      const inicio = performance.now();
      const res = await api.get("/health/");
      const fin = performance.now();

      const tiempo = Math.round(fin - inicio);
      setLatenciaMs(tiempo);
      setUltimaRevision(new Date().toLocaleString("es-CL"));

      if (res.data && res.data.status === "ok") {
        setStatus({
          ok: true,
          message: `Conectado correctamente ✔️ (Servicio: ${res.data.service})`,
        });
      } else {
        setStatus({
          ok: false,
          message: "El backend respondió, pero con datos inesperados.",
        });
      }
    } catch (err) {
      setLatenciaMs(null);
      setUltimaRevision(new Date().toLocaleString("es-CL"));
      setStatus({
        ok: false,
        message:
          "No se pudo conectar al backend ❌ (" +
          String(err.message || err) +
          ")",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    comprobarBackend();
  }, []);

  return (
    <main className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">

        {/* HEADER */}
        <header className="mb-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Diagnóstico de conexión
          </span>
          <h1 className="fw-bold text-primary">
            Estado de conexión con el backend
          </h1>
          <p className="text-muted">
            Esta página permite verificar si el servicio backend de ZofriConnect
            está disponible y funcionando correctamente.
          </p>
        </header>

        {/* TARJETA DE ESTADO */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold mb-0">Resultado:</h5>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={comprobarBackend}
              disabled={cargando}
            >
              {cargando ? "Comprobando..." : "Reintentar"}
            </button>
          </div>

          <div
            className={`alert ${
              status.ok ? "alert-success" : "alert-danger"
            } mb-0`}
          >
            <strong>
              {status.ok ? "Conexión exitosa" : "Conexión fallida"}
            </strong>
            <br />
            {status.message}
          </div>
        </div>

        {/* INFO EXTRA */}
        <div className="small text-muted">
          {ultimaRevision && (
            <p className="mb-1">
              <strong>Última comprobación:</strong> {ultimaRevision}
            </p>
          )}
          {latenciaMs !== null && (
            <p className="mb-1">
              <strong>Tiempo de respuesta:</strong> {latenciaMs} ms
            </p>
          )}
          <p className="mb-0">
            *Esta herramienta es parte del prototipo académico ZofriConnect para
            verificar disponibilidad del backend en Render u otro servicio de despliegue.
          </p>
        </div>
      </div>
    </main>
  );
}
