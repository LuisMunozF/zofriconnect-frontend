import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* Barra superior informativa */}
      <div className="bg-primary text-center text-white py-1 small">
        ZofriConnect · Plataforma web para conectar empresas usuarias de ZOFRI con
        compradores mayoristas mediante catálogo, mapa de empresas y cotización.
      </div>

      {/* NAVBAR PRINCIPAL */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 position-relative">
        <div className="container-fluid">
          {/* Redes sociales (opcional) */}
          <div className="d-none d-lg-flex gap-3 me-3">
            <a href="#" className="text-dark fs-5" aria-label="Facebook ZofriConnect">
              <i className="bi bi-facebook text-primary"></i>
            </a>
            <a href="#" className="text-dark fs-5" aria-label="Instagram ZofriConnect">
              <i className="bi bi-instagram text-primary"></i>
            </a>
          </div>

          {/* Etiqueta de zona */}
          <div className="d-none d-lg-block me-4">
            <span className="badge bg-outline-primary border border-primary text-primary">
              Zona Franca de Iquique · ZOFRI
            </span>
          </div>

          {/* Toggle responsive */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links izquierda */}
          <div
            className="collapse navbar-collapse order-2 order-lg-1"
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/catalogo">
                  Catálogo mayorista
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/mapa">
                  Mapa de empresas
                </Link>
              </li>
              {/* Si tienes página de empresas, puedes ajustar la ruta */}
              {/* <li className="nav-item">
                <Link className="nav-link text-primary" to="/empresa">
                  Empresas usuarias
                </Link>
              </li> */}
            </ul>
          </div>

          {/* LOGO CENTRADO */}
          <Link
            className="navbar-brand fw-bold fs-3 text-primary position-absolute top-50 start-50 translate-middle"
            to="/"
            style={{ pointerEvents: "auto" }}
          >
            ZofriConnect
          </Link>

          {/* Buscador derecha */}
          <form className="d-none d-lg-flex ms-auto order-1 order-lg-2 w-25">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar empresa o producto..."
            />
          </form>

          {/* Acceso empresas / registro */}
          <ul className="navbar-nav ms-3 order-3 align-items-center">
            <li className="nav-item me-2">
              <Link className="btn btn-outline-primary btn-sm" to="/login">
                Acceso empresas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary btn-sm" to="/registro">
                Registrar empresa
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* MENÚ DE CATEGORÍAS (adaptado a rubros ZOFRI) */}
      <div className="bg-white border-top shadow-sm">
        <div className="container-fluid">
          <ul className="nav justify-content-center py-2 fw-semibold">
            <li className="nav-item dropdown px-3">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Electrónica y Tecnología
              </span>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item">Telefonía y accesorios</span>
                </li>
                <li>
                  <span className="dropdown-item">Computación y redes</span>
                </li>
                <li>
                  <span className="dropdown-item">Electrohogar</span>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown px-3">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Automotriz y Repuestos
              </span>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item">Repuestos livianos</span>
                </li>
                <li>
                  <span className="dropdown-item">Repuestos pesados</span>
                </li>
                <li>
                  <span className="dropdown-item">Accesorios vehiculares</span>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown px-3">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Hogar y Deco
              </span>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item">Muebles y decoración</span>
                </li>
                <li>
                  <span className="dropdown-item">Menaje y cocina</span>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown px-3">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Textil y Calzado
              </span>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item">
                    Ropa y accesorios mayoristas
                  </span>
                </li>
                <li>
                  <span className="dropdown-item">Calzado</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
