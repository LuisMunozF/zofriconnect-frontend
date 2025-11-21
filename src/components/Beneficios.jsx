import React from 'react'

const Beneficios = () => {
  return (
    <div>
    {/*       BENEFICIOS         */}
      <section className="container py-5">
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-truck fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Delivery Económico</h5>
              <p>Iquique, Alto Hospicio</p>
            </div>
          </div>

          {/* Pago Seguro */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-credit-card-2-front fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Pago 100% Seguro</h5>
              <p>Hasta 3 cuotas sin interés</p>
            </div>
          </div>

          {/* Seguimiento */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-box-seam fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Seguimiento de Compras</h5>
              <p>Revisa el estado de tu pedido</p>
            </div>
          </div>

          {/* Cambios y Devoluciones */}
          <div className="col-md-3">
            <div className="p-4 rounded bg-white">
              <i className="bi bi-arrow-repeat fs-1 text-primary"></i>
              <h5 className="fw-bold mt-3">Cambios y Devoluciones</h5>
              <p>Devolver y cambiar es parte de elegir</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Beneficios
