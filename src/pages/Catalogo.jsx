import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Catalogo() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/productos/")
      .then((r) => setItems(r.data))
      .catch((e) => setErr(e.message));
  }, []);

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
                <p className="card-text">${String(p.precio)}</p>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && !err && <p>Sin productos aún.</p>}
      </div>
    </div>
  );
}