import React from 'react'

const CategoriasCentral = () => {
  return (
    <div>
      {/* Categorías centrales ZofriConnect */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-4 text-primary">Explora por rubro mayorista</h2>
        <p className="text-muted mb-5">
          Ejemplos de categorías que las empresas usuarias de ZOFRI pueden publicar en el catálogo digital.
        </p>

        <div className="row justify-content-center g-4">
          {/* TECNOLOGÍA Y ELECTRÓNICA */}
          <div className="col-6 col-md-3">
            <div>
              <img
                src="https://via.placeholder.com/300x200?text=Tecnologia+y+Electronica"
                className="img-fluid rounded"
                alt="Tecnología y Electrónica"
              />
              <h5 className="mt-3">Tecnología y Electrónica</h5>
            </div>
          </div>

          {/* AUTOMOTRIZ Y REPUESTOS */}
          <div className="col-6 col-md-3">
            <div>
              <img
                src="https://via.placeholder.com/300x200?text=Automotriz+y+Repuestos"
                className="img-fluid rounded"
                alt="Automotriz y Repuestos"
              />
              <h5 className="mt-3">Automotriz y Repuestos</h5>
            </div>
          </div>

          {/* TEXTIL, HOGAR Y OTROS */}
          <div className="col-6 col-md-3">
            <div>
              <img
                src="https://via.placeholder.com/300x200?text=Textil+Hogar+y+Otros"
                className="img-fluid rounded"
                alt="Textil, Hogar y Otros"
              />
              <h5 className="mt-3">Textil, Hogar y Otros</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CategoriasCentral
