import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage y validar con /soy/
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token_access");

    if (!token) {
      setUsuario(null);
      return;
    }

    // Mostrar rápido lo que tengamos guardado
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error al parsear usuario almacenado:", e);
      }
    }

    // Validar contra el backend y traer datos frescos
    api
      .get("/soy/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuario(res.data);
        localStorage.setItem("usuario", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.warn("Error al consultar /soy/:", err);
        localStorage.removeItem("token_access");
        localStorage.removeItem("token_refresh");
        localStorage.removeItem("usuario");
        setUsuario(null);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token_access");
    localStorage.removeItem("token_refresh");
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/";
  };

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
          
          {/* Redes sociales */}
          <div className="d-none d-lg-flex gap-3 me-3">
            <a href="#" className="text-dark fs-5">
              <i className="bi bi-facebook text-primary"></i>
            </a>
            <a href="#" className="text-dark fs-5">
              <i className="bi bi-instagram text-primary"></i>
            </a>
          </div>

          {/* Etiqueta zona */}
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

          {/* Zona derecha */}
          <ul className="navbar-nav ms-3 order-3 align-items-center">
            {usuario ? (
              <>
                {/* Información de sesión */}
                <li className="nav-item d-none d-lg-block me-3">
                  <span className="small text-muted">
                    Sesión: <strong>{usuario.nombre || usuario.correo}</strong>{" "}
                    {usuario.rol && (
                      <span className="text-uppercase ms-1">
                        ({usuario.rol})
                      </span>
                    )}
                  </span>
                </li>

                {/* Botón Panel Admin (solo ADMIN) */}
                {usuario?.rol === "ADMIN" && (
                  <li className="nav-item me-2">
                    <Link className="btn btn-dark btn-sm" to="/admin">
                      Panel Admin
                    </Link>
                  </li>
                )}

                {/* Botones de empresa (solo EMPRESA) */}
                {usuario?.rol === "EMPRESA" && (
                  <>
                    <li className="nav-item me-2">
                      <Link
                        className="btn btn-outline-primary btn-sm"
                        to="/empresa"
                      >
                        Mi empresa
                      </Link>
                    </li>
                    <li className="nav-item me-2">
                      <Link
                        className="btn btn-outline-secondary btn-sm"
                        to="/empresa/cotizaciones"
                      >
                        Cotizaciones recibidas
                      </Link>
                    </li>
                  </>
                )}

                {/* Botón Mis Cotizaciones (solo CLIENTE) */}
                {usuario?.rol === "CLIENTE" && (
                  <li className="nav-item me-2">
                    <Link
                      className="btn btn-outline-success btn-sm"
                      to="/mis-cotizaciones"
                    >
                      Mis cotizaciones
                    </Link>
                  </li>
                )}

                {/* Cerrar sesión */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-primary btn-sm" to="/login">
                    Acceso empresas
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="btn btn-primary btn-sm" to="/registro">
                    Registrar empresa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-success btn-sm"
                    to="/registro-cliente"
                  >
                    Soy cliente
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* MENÚ DE CATEGORÍAS */}
      <div className="bg-white border-top shadow-sm">
        <div className="container-fluid">
          <ul className="nav justify-content-center py-2 fw-semibold">
            <li className="nav-item dropdown px-3">
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
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
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
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
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
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
              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Textil y Calzado
              </span>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item">Ropa y accesorios mayoristas</span>
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
