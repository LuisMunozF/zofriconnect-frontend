

export default function ProductCarousel() {
  const productos = [
    {
      id: 1,
      img: "https://jpt.cl/wp-content/uploads/2022/11/TomFord1.png",
      nombre: "Tom Ford Lost Cherry 50ML",
      precio: "$129.900"
    },
    {
      id: 2,
      img: "https://jpt.cl/wp-content/uploads/2022/11/TomFord2.png",
      nombre: "Tom Ford Oud Wood 100ML",
      precio: "$279.900"
    },
    {
      id: 3,
      img: "https://jpt.cl/wp-content/uploads/2022/11/TomFord3.png",
      nombre: "Tom Ford Noir Extreme",
      precio: "$199.900"
    },
    {
      id: 4,
      img: "https://jpt.cl/wp-content/uploads/2022/11/TomFord4.png",
      nombre: "Tom Ford Black Orchid",
      precio: "$159.900"
    },
    {
      id: 5,
      img: "https://jpt.cl/wp-content/uploads/2022/11/TomFord4.png",
      nombre: "Tom Ford Black Orchid",
      precio: "$159.900"
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Nuevos Productos</h2>

      <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Primer slide */}
          <div className="carousel-item active">
            <div className="row justify-content-center">
              {productos.slice(0, 3).map(p => (
                <div className="col-6 col-md-4 col-lg-3 text-center" key={p.id}>
                  <div className="card border-0">
                    <img src={p.img} className="card-img-top product-img" alt={p.nombre} />
                    <div className="card-body">
                      <h6 className="fw-bold">{p.nombre}</h6>
                      <p className="text-primary fw-bold">{p.precio}</p>
                      <button className="btn btn-primary w-100">Añadir al carrito</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segundo slide */}
          <div className="carousel-item">
            <div className="row justify-content-center">
              {productos.slice(1, 4).map(p => (
                <div className="col-6 col-md-4 col-lg-3 text-center" key={p.id}>
                  <div className="card border-0">
                    <img src={p.img} className="card-img-top product-img" alt={p.nombre} />
                    <div className="card-body">
                      <h6 className="fw-bold">{p.nombre}</h6>
                      <p className="text-primary fw-bold">{p.precio}</p>
                      <button className="btn btn-primary w-100">Añadir al carrito</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Flechas */}
        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev" >
            <span className="carousel-control-prev-icon bg-primary"></span>
        </button>
        <button className="carousel-control-next"type="button"data-bs-target="#productCarousel"data-bs-slide="next">
            <span className="carousel-control-next-icon bg-primary"></span>
        </button>
      </div>
    </div>
  );
}
