import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Mapa(){
  const [empresas, setEmpresas] = useState([]);

  useEffect(()=>{
    api.get("/empresas/").then(r => {
      const data = r.data.results || r.data; // paginado o no
      setEmpresas(data);
    }).catch(()=> setEmpresas([]));
  },[]);

  const center = [-20.2307, -70.1357]; // Iquique

  return (
    <div className="container py-3">
      <h3>Mapa de Empresas</h3>
      <div style={{height: "480px"}} className="mt-3">
        <MapContainer center={center} zoom={12} style={{height: "100%", width: "100%"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution="&copy; OpenStreetMap contributors" />
          {empresas.filter(e => e.lat && e.lng).map(e => (
            <Marker key={e.id} position={[e.lat, e.lng]}>
              <Popup>
                <b>{e.nombre}</b><br/>
                {e.direccion || "Sin dirección"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}