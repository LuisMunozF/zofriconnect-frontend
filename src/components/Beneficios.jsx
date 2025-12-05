import React from 'react'

const Beneficios = () => {
  return (
    <div>
      {/* BENEFICIOS ZOFRICONNECT */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-primary">
          Beneficios de ZofriConnect
        </h2>

        <div className="row text-center g-4">

          {/* Catálogo digital */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-card-checklist fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Catálogo Digital</h5>
              <p>Las empresas usuarias publican sus productos y actualizan información en línea.</p>
            </div>
          </div>

          {/* Geolocalización */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-geo-alt fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Mapa de Empresas</h5>
              <p>Ubicación dentro del recinto amurallado para mejorar la visibilidad y acceso.</p>
            </div>
          </div>

          {/* Cotización B2B */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-envelope-paper fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Cotización Directa</h5>
              <p>Los compradores mayoristas solicitan cotizaciones fácilmente desde la plataforma.</p>
            </div>
          </div>

          {/* Modernización ZOFRI */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-building fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Modernización Comercial</h5>
              <p>Impulsa la transformación digital de ZOFRI y apoya la gestión de las empresas usuarias.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Beneficios