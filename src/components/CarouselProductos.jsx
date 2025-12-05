export default function ProductCarousel() {
  const productos = [
    {
      id: 1,
      img: "https://via.placeholder.com/300x300?text=Notebook+Mayorista",
      nombre: "Notebook empresarial 14''",
      detalle: "Proveedor: Importadora Tech Norte · Stock mayorista"
    },
    {
      id: 2,
      img: "https://via.placeholder.com/300x300?text=Repuestos+Automotrices",
      nombre: "Kit de frenos para vehículo liviano",
      detalle: "Proveedor: Repuestos ZOFRI · Venta por volumen"
    },
    {
      id: 3,
      img: "https://via.placeholder.com/300x300?text=Textil+Mayorista",
      nombre: "Pack poleras básicas unisex",
      detalle: "Proveedor: Textil Altos del Mar · Mínimo de compra"
    },
    {
      id: 4,
      img: "https://via.placeholder.com/300x300?text=Electrohogar+Mayorista",
      nombre: "Lote de hervidores eléctricos 1.7L",
      detalle: "Proveedor: Hogar Andino · Pallet mixto"
    },
    {
      id: 5,
      img: "https://via.placeholder.com/300x300?text=Iluminacion+LED",
      nombre: "Caja de focos LED industriales",
      detalle: "Proveedor: Ilumina Zofri · Uso bodegas y galpones"
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-primary">
        Productos destacados del catálogo mayorista
      </h2>

      <p className="text-center text-muted mb-4">
        Ejemplo de productos que las empresas usuarias pueden publicar en ZofriConnect.
        La información mostrada es referencial para el prototipo.
      </p>

      <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Primer slide */}
          <div className="carousel-item active">
            <div className="row justify-content-center">
              {productos.slice(0, 3).map((p) => (
                <div className="col-6 col-md-4 col-lg-3 text-center" key={p.id}>
                  <div className="card border-0">
                    <img
                      src={p.img}
                      className="card-img-top product-img"
                      alt={p.nombre}
                    />
                    <div className="card-body">
                      <h6 className="fw-bold">{p.nombre}</h6>
                      <p className="text-muted small">{p.detalle}</p>
                      <button className="btn btn-outline-primary w-100">
                        Ver detalle / Cotizar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segundo slide */}
          <div className="carousel-item">
            <div className="row justify-content-center">
              {productos.slice(2, 5).map((p) => (
                <div className="col-6 col-md-4 col-lg-3 text-center" key={p.id}>
                  <div className="card border-0">
                    <img
                      src={p.img}
                      className="card-img-top product-img"
                      alt={p.nombre}
                    />
                    <div className="card-body">
                      <h6 className="fw-bold">{p.nombre}</h6>
                      <p className="text-muted small">{p.detalle}</p>
                      <button className="btn btn-outline-primary w-100">
                        Ver detalle / Cotizar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Flechas */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-primary"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-primary"></span>
        </button>
      </div>
    </div>
  );
}