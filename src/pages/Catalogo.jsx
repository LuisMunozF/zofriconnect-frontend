import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Catalogo() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  // 🔹 Cargar productos al montar el componente
  useEffect(() => {
    api
      .get("/productos/")
      .then((r) => {
        // Si tu API usa paginación DRF → r.data.results
        const data = Array.isArray(r.data) ? r.data : r.data.results || [];
        setItems(data);
      })
      .catch((e) => setErr(e.message));
  }, []);

  // Función para solicitar cotización de un producto
  const solicitar = async (producto) => {
    try {
      const nombre = prompt("Tu nombre (solicitante):");
      if (!nombre) return;

      // IMPORTANTE: producto.empresa debe ser el ID de la empresa
      await api.post("/cotizaciones/", {
        empresa: producto.empresa, // id empresa dueña del producto
        solicitante: nombre,
        mensaje: `Consulta por: ${producto.nombre}`,
      });

      alert("Solicitud enviada. La empresa te contactará.");
    } catch (e) {
      console.error(e);
      alert("No se pudo enviar la cotización.");
    }
  };

  return (
    <div>
      <h3>Catálogo</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="row">
        {items.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text"> ${String(p.precio)}</p>
                {/* 🔹 Botón para pedir cotización de ese producto */}
                <button className="btn btn-outline-primary btn-sm" onClick={() => solicitar(p)}>
                  Solicitar cotización
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && !err && <p>Sin productos aún.</p>}
      </div>
    </div>
  );
}
