import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Mapa() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/empresas/")
      .then((r) => {
        const data = r.data.results || r.data; // paginado o lista plana
        setEmpresas(data);
      })
      .catch(() => setEmpresas([]))
      .finally(() => setLoading(false));
  }, []);

  // Coordenadas de Iquique
  const center = [-20.2307, -70.1357];

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">

        {/* TÍTULO + CONTEXTO */}
        <header className="mb-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Módulo · Geolocalización de empresas
          </span>

          <h1 className="fw-bold text-primary">Mapa de empresas usuarias ZOFRI</h1>

          <p className="text-muted">
            Este mapa muestra las empresas ubicadas dentro del recinto amurallado
            y alrededores de la Zona Franca de Iquique. Cada marcador 
            corresponde a una empresa registrada en ZofriConnect que informó su 
            latitud y longitud en el sistema.
          </p>
        </header>

        {/* MENSAJE DE CARGA */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="text-muted">Cargando mapa y empresas...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* INFO SOBRE EMPRESAS VÁLIDAS */}
            <p className="small text-muted mb-2">
              Empresas con ubicación válida:{" "}
              <span className="badge bg-primary">
                {empresas.filter((e) => e.lat && e.lng).length}
              </span>
            </p>

            {/* MAPA */}
            <div
              className="rounded shadow-sm border"
              style={{ height: "500px", overflow: "hidden" }}
            >
              <MapContainer
                center={center}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                {/* MARCADORES */}
                {empresas
                  .filter((e) => e.lat && e.lng)
                  .map((e) => (
                    <Marker key={e.id} position={[e.lat, e.lng]}>
                      <Popup>
                        <b>{e.nombre}</b>
                        <br />
                        {e.direccion || "Sin dirección registrada"}
                        <br />
                        {e.correo && <span>{e.correo}</span>}
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>

            {/* NOTA */}
            <p className="text-muted small mt-3">
              *Este módulo es parte del prototipo académico ZofriConnect y 
              utiliza datos almacenados en el backend para mostrar la ubicación aproximada 
              de las empresas usuarias.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
