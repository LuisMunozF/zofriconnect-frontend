import React from 'react'

const CategoriasCentral = () => {
  return (
    <div>
        {/* Categorias Central */}
      <section className="container py-5 text-center">
        <div className="row justify-content-center g-4">
          {/* COLONIAS */}
          <div className="col-6 col-md-3">
            <div>
              <img src="https://jpt.cl/wp-content/uploads/2022/11/Colonias.png" className="img-fluid" alt="Colonias" />
              <h5 className="mt-3">COLONIAS</h5>
            </div>
          </div>

          {/* HOGAR */}
          <div className="col-6 col-md-3">
            <div>
              <img src="https://jpt.cl/wp-content/uploads/2022/11/Hogar.png" className="img-fluid" alt="Hogar" />
              <h5 className="mt-3">HOGAR</h5>
            </div>
          </div>

          {/* BAÑO Y CUERPO */}
          <div className="col-6 col-md-3">
            <div>
              <img src="https://jpt.cl/wp-content/uploads/2022/11/BanoYCuerpo.png" className="img-fluid" alt="Baño y Cuerpo" />
              <h5 className="mt-3">BAÑO Y CUERPO</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CategoriasCentral
