import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* FOOTER ZOFRICONNECT */}
      <footer className="bg-primary text-white pt-5 pb-3 mt-5">
        <div className="container">

          {/* TITULO */}
          <h3 className="text-center fw-bold mb-4">ZofriConnect</h3>
          <p className="text-center mb-5">
            Plataforma digital para facilitar el acceso al catálogo mayorista, 
            la geolocalización de empresas usuarias y el sistema de cotización dentro de ZOFRI.
          </p>

          <div className="row text-center text-md-start">

            {/* INFO PRINCIPAL */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Sobre el proyecto</h5>
              <p>
                ZofriConnect es un prototipo académico orientado a modernizar la gestión comercial 
                de las empresas usuarias del Recinto Amurallado ZOFRI, conectándolas con compradores mayoristas.
              </p>

              <p className="mb-1">
                <strong>Ubicación:</strong> Zona Franca de Iquique, Chile
              </p>
              <p className="mb-3">
                <strong>Correo:</strong> contacto@zofriconnect.cl
              </p>

              {/* Redes */}
              <div className="d-flex gap-3 justify-content-center justify-content-md-start fs-4">
                <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            {/* ENLACES A MÓDULOS */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Módulos principales</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/catalogo" className="text-white text-decoration-none">
                    Catálogo mayorista
                  </a>
                </li>
                <li>
                  <a href="/mapa" className="text-white text-decoration-none">
                    Mapa de empresas
                  </a>
                </li>
                <li>
                  <a href="/registro" className="text-white text-decoration-none">
                    Registrar empresa
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-white text-decoration-none">
                    Acceso empresas
                  </a>
                </li>
              </ul>
            </div>

            {/* ACERCA DE ZOFRI */}
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">ZOFRI · Zona Franca de Iquique</h5>
              <p>
                El sistema está diseñado considerando las necesidades de visibilidad comercial, 
                promoción de productos y ubicación estratégica de las empresas dentro del recinto amurallado.
              </p>
              <p className="small text-light">
                Prototipo académico — no representa una plataforma oficial de ZOFRI S.A.
              </p>

              {/* ENLACE DISCRETO AL DIAGNÓSTICO DEL BACKEND */}
              <p className="small mt-3">
                <a 
                  href="/conexion" 
                  className="text-light text-decoration-none opacity-75"
                >
                  Estado del backend
                </a>
              </p>
            </div>

          </div>

          <hr className="border-secondary" />

          {/* COPYRIGHT */}
          <p className="text-center mt-3 mb-0">
            © 2025 ZofriConnect — Prototipo académico para fines educativos.
          </p>

        </div>
      </footer>
    </div>
  )
}

export default Footer
