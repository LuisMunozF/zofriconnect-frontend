import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Login from "./pages/Logintemp.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
