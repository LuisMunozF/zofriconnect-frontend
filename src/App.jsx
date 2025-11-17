import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Login from "./pages/Logintemp.jsx";
import Empresa from "./pages/Empresa.jsx";
import Mapa from "./pages/Mapa";
import Registro from "./pages/Registro.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Empresa" element={<Empresa />} />
        <Route path="/mapa" element={<Mapa/>} />
      </Routes>
    </>
  );
}
