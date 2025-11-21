import React from 'react'

const Footer = () => {
  return (
    <div>
            {/*         FOOTER          */} 
      <footer className="bg-primary text-white pt-5 pb-3 mt-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">Suscríbete a ZofriConnect</h3>
          <p className="text-center mb-4">Te invitamos a recibir ofertas, descuentos y novedades exclusivas.</p>

          {/* Formulario de Suscripción */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-5 mb-3">
              <label className="form-label">Correo electrónico *</label>
              <input type="email" className="form-control" placeholder="tu@email.com" />
            </div>
            <div className="col-md-5 mb-3">
              <label className="form-label">Fecha de nacimiento</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-2 d-flex align-items-end mb-3">
              <button className="btn btn- w-100">Suscribirse</button>
            </div>
          </div>

          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold">ZofriConnect</h4>
              <p>Mall Zofri, Iquique, Chile</p>
              <p>contacto@zofriconnect.cl</p>

              {/* Redes */}
              <div className="d-flex gap-3 justify-content-center justify-content-md-start fs-4">
                <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            {/* Servicio al cliente */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Servicio al Cliente</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-white text-decoration-none">Términos y Condiciones</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contáctanos</a></li>
                <li><a href="#" className="text-white text-decoration-none">Nuestras Tiendas</a></li>
                <li><a href="#" className="text-white text-decoration-none">Mi lista de deseos</a></li>
              </ul>
            </div>

            {/* Pagos seguros */}
            <div className="col-md-4 ">
              <h5 className="fw-bold">Pago 100% Seguro</h5>
              <p>Protección SSL y pago seguro</p>
              <img src="https://jpt.cl/wp-content/uploads/2022/02/logo_transbankwebpayplus-300x111.png" alt="Métodos de pago" style={{ maxWidth: "180px" }}/> <br />
              <img src="https://jpt.cl/wp-content/uploads/2022/01/Transbank-logo-2.png" alt="Métodos de pago" style={{ maxWidth: "200px" }}/>
            </div>
          </div>

          <hr className="border-secondary" />
          {/* Copyright */}
          <p className="text-center mt-3 mb-0">
            © 2025 ZofriConnect — Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
