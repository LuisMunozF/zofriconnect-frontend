import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Login from "./pages/Logintemp.jsx";
import Empresa from "./pages/Empresa.jsx";
import Mapa from "./pages/Mapa";
import Registro from "./pages/Registro.jsx";
import Conexion from "./pages/Conexion.jsx";
import PanelAdmin from "./pages/PanelAdmin";
import RegistroCliente from "./pages/RegistroCliente";
import MisCotizaciones from "./pages/MisCotizaciones";
import CotizacionesEmpresa from "./pages/CotizacionesEmpresa";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Conexion" element={<Conexion />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/Empresa" element={<Empresa />} />
        <Route path="/mapa" element={<Mapa/>} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro-cliente" element={<RegistroCliente />} />
        <Route path="/mis-cotizaciones" element={<MisCotizaciones />} />
        <Route path="/empresa/cotizaciones" element={<CotizacionesEmpresa />} />
      </Routes>
    </>
  );
}
