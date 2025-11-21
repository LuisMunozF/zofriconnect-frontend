import api from "../api/axios";
import { useEffect, useState } from "react";

export default function Conexion() {
  const [status, setStatus] = useState({
    ok: false,
    message: "Comprobando backend...",
  });

  useEffect(() => {
    api
      .get("/health/")
      .then((res) => {
        if (res.data && res.data.status === "ok") {
          setStatus({
            ok: true,
            message: "Backend OK ✔️ (" + res.data.service + ")",
          });
        } else {
          setStatus({
            ok: false,
            message: "Respuesta inesperada del backend",
          });
        }
      })
      .catch((err) =>
        setStatus({
          ok: false,
          message:
            "Backend no disponible ❌ (" +
            String(err.message || err) +
            ")",
        })
      );
  }, []);

  return (
    <div>
      <div className="container py-4">
        <div className={`alert ${   status.ok ? "alert-success" : "alert-warning" }`}>
          <strong>Backend:</strong> {status.message}
        </div>
        <p className="text-muted"> Edita <code>src/pages/Home.jsx</code> y guarda para recargar. </p>
      </div>
    </div>
  );
}
