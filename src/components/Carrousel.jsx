import React from 'react'

const Carrousel = () => {
  return (
    <div>
      {/* CARRUSEL ZOFRICONNECT */}
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">

        {/* Indicadores */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner" style={{ height: '81vh', width: '100%' }}>

          {/* Slide 1 */}
          <div className="carousel-item active position-relative">
            <img src="img/Zofri1.jpg" className="d-block w-100" alt="slide1" />

            {/* TEXTO SOBRE IMAGEN */}
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold text-shadow">Catálogo digital mayorista</h2>
              <p className="lead text-shadow">Explora productos publicados por empresas usuarias de ZOFRI.</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item position-relative">
            <img src="img/Zofri2.jpg" className="d-block w-100" alt="slide2" />

            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold text-shadow">Mapa de empresas</h2>
              <p className="lead text-shadow">Ubicación precisa dentro del recinto amurallado.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item position-relative">
            <img src="img/Zofri3.jpg" className="d-block w-100" alt="slide3" />

            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold text-shadow">Cotización rápida</h2>
              <p className="lead text-shadow">Conecta compradores y proveedores mayoristas.</p>
            </div>
          </div>

        </div>

        {/* Flechas */}
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* CSS opcional para sombra del texto */}
      <style>
        {`
          .text-shadow {
            text-shadow: 0 2px 8px rgba(0,0,0,0.7);
          }
        `}
      </style>
    </div>
  )
}

export default Carrousel

