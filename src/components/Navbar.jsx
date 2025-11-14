import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Logo / nombre del sitio */}
        <Link className="navbar-brand" to="/">ZofriConnect</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Productos</Link>
            </li>
            {/* 🔹 Nuevo enlace al mapa */}
            <li className="nav-item">
              <Link className="nav-link" to="/mapa">Mapa</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/registro">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Inicio Sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


