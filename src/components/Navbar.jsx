import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* Barra superior azul */}
      <div className="bg-primary text-center text-white py-1 small">
        Delivery Iquique y Alto Hospicio $2.500 en 24 a 72 hrs hábiles.
        Delivery Arica $3.500 (según peso del producto) de 3 a 5 días hábiles.
      </div>

      {/* NAVBAR PRINCIPAL */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 position-relative">
        <div className="container-fluid">

          {/* Redes sociales */}
          <div className="d-none d-lg-flex gap-3 me-3">
            <a href="#" className="text-dark fs-5">
              <i className="bi bi-facebook text-primary"></i>
            </a>
            <a href="#" className="text-dark fs-5">
              <i className="bi bi-instagram text-primary"></i>
            </a>
          </div>

          {/* Selector de región */}
          <div className="dropdown me-4 d-none d-lg-block">
            <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
              Seleccionar región
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Iquique</a></li>
              <li><a className="dropdown-item" href="#">Alto Hospicio</a></li>
              <li><a className="dropdown-item" href="#">Arica</a></li>
            </ul>
          </div>

          {/* Toggle responsive */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links izquierda */}
          <div className="collapse navbar-collapse order-2 order-lg-1" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link text-primary" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link text-primary" to="/catalogo">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link text-primary" to="/mapa">Mapa</Link></li>
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
            <input className="form-control" type="search" placeholder="Buscar productos..." />
          </form>

          {/* Iconos */}
          <ul className="navbar-nav ms-3 order-3 align-items-center">
            <li className="nav-item me-3">
              <Link className="nav-link fs-5" to="/login">
                <i className="bi bi-person-circle text-primary"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5 position-relative" to="/carrito">
                <i className="bi bi-bag text-primary"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">0</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* MENÚ DE CATEGORÍAS */}
      <div className="bg-white border-top shadow-sm">
        <div className="container-fluid">
          <ul className="nav justify-content-center py-2 fw-semibold">

            {/* CATEGORÍA - NORMAL */}
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">PERFUMES</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Marca 1</a></li>
                <li><a className="dropdown-item" href="#">Marca 2</a></li>
                <li><a className="dropdown-item" href="#">Marca 3</a></li>
              </ul>
            </li>

            {/* CATEGORÍA - PERFUMES ÁRABES */}
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">PERFUMES ÁRABES</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item">MARYAJ</a></li>
                <li><a className="dropdown-item">KHADLAJ</a></li>
                <li><a className="dropdown-item">ARD AL ZAAFARAN</a></li>
                <li><a className="dropdown-item">AJMAL</a></li>
                <li><a className="dropdown-item">ASDAAF</a></li>
                <li><a className="dropdown-item">LATTAFA</a></li>
                <li><a className="dropdown-item">LATTAFA RAVE</a></li>
                <li><a className="dropdown-item">LATTAFA PRIDE</a></li>
                <li><a className="dropdown-item">NICHE EMARATI</a></li>
              </ul>
            </li>

            {/* Perfumes Nico */}
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">PERFUMES NICHO</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item">Categoría 1</a></li>
                <li><a className="dropdown-item">Categoría 2</a></li>
              </ul>
            </li>

            {/* EJEMPLO */}
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">COSMÉTICOS</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item">Maquillaje</a></li>
                <li><a className="dropdown-item">Cuidado facial</a></li>
              </ul>
            </li>

            {/* EJEMPLO */}
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">COSMÉTICOS</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item">Maquillaje</a></li>
                <li><a className="dropdown-item">Cuidado facial</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">COSMÉTICOS</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item">Maquillaje</a></li>
                <li><a className="dropdown-item">Cuidado facial</a></li>
            </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
