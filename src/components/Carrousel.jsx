import React from 'react'

const Carrousel = () => {
  return (
    <div>
    {/*    CARRUSEL DE IMÁGENES  */}
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner" style={{ height: '81vh', width: '100%' }}>
          <div className="carousel-item active">
            <img src="img/Zofri1.jpg" className="d-block w-100" alt="slide1" />
          </div>
          <div className="carousel-item">
            <img src="img/Zofri2.jpg" className="d-block w-100" alt="slide2" />
          </div>
          <div className="carousel-item">
            <img src="img/Zofri3.jpg" className="d-block w-100" alt="slide3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  )
}

export default Carrousel
