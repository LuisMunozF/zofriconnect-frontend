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
              <img src="https://flormayo.com/wp-content/uploads/2022/04/perfumes-mujer.webp" className="img-fluid" alt="Colonias" />
              <h5 className="mt-3">COLONIAS</h5>
            </div>
          </div>
          {/* HOGAR */}
          <div className="col-6 col-md-3">
            <div>
              <img src="https://www.livitum.com/blogs/1/5/7/tx_41d663a9-6e1a-4f3c-848f-5bb852340f84_acesorios_que_elevan_decoracion.jpg" className="img-fluid" alt="Hogar" />
              <h5 className="mt-3">HOGAR</h5>
            </div>
          </div>
          {/* BAÑO Y CUERPO */}
          <div className="col-6 col-md-3">
            <div>
              <img src="https://shop.marriott.com/dw/image/v2/BLCS_PRD/on/demandware.static/-/Sites-productCatalog_MBB/default/dw22dc5c3a/images/main/westin-bath-body-set-HB-308-WT-SET-3000-3794-2.jpg?sw=640&sh=809" className="img-fluid" alt="Baño y Cuerpo" />
              <h5 className="mt-3">BAÑO Y CUERPO</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default CategoriasCentral
