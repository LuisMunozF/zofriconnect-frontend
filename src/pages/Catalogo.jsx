import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Catalogo() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  // Estado del formulario para crear un producto
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [empresas, setEmpresas] = useState([]); // Asegurarse que sea un array
  const [categorias, setCategorias] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");

  // Cargar productos, empresas y categorías al montar el componente
  useEffect(() => {
    cargarProductos();

    // Obtener empresas
    api
      .get("/empresas/")
      .then((r) => {
        const empresasData = Array.isArray(r.data)
          ? r.data
          : r.data?.results || [];
        setEmpresas(empresasData);
      })
      .catch(() => setErr("Error al cargar empresas"));

    // Obtener categorías
    api
      .get("/categorias/")
      .then((r) => {
        const categoriasData = Array.isArray(r.data)
          ? r.data
          : r.data?.results || [];
        setCategorias(categoriasData);
      })
      .catch(() => setErr("Error al cargar categorías"));
  }, []);

  // Función para recargar los productos
  const cargarProductos = () => {
    api
      .get("/productos/")
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : r.data.results || [];
        setItems(data);
      })
      .catch((e) => setErr(e.message));
  };

  // Función para solicitar cotización de un producto
  const solicitar = async (producto) => {
    try {
      const nombre = prompt("Tu nombre (solicitante):");
      if (!nombre) return;

      await api.post("/cotizaciones/", {
        empresa: producto.empresa, // id empresa dueña del producto
        solicitante: nombre,
        mensaje: `Consulta por: ${producto.nombre}`,
      });

      alert("Solicitud enviada. La empresa te contactará.");
    } catch (e) {
      console.error(e);
      alert("No se pudo enviar la cotización.");
    }
  };

  // Función para crear un nuevo producto
  const crearProducto = async (e) => {
    e.preventDefault();

    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero)) {
      alert("El precio debe ser un número válido");
      return;
    }

    try {
      // Crear producto
      const res = await api.post("/productos/", {
        nombre,
        descripcion,
        precio: precioNumero,
        empresa: selectedEmpresa,
        categoria: selectedCategoria,
      });

      const productoId = res.data.id;

      // Subir imagen si existe
      if (imagen) {
        const formData = new FormData();
        formData.append("imagen", imagen);

        await api.post(`/productos/${productoId}/subir_imagen/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Limpiar formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen(null);
      setShowForm(false);
      setSelectedEmpresa("");
      setSelectedCategoria("");

      // Recargar productos
      cargarProductos();
      alert("Producto creado con éxito 🎉");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto.");
    }
  };

  return (
    <main className="bg-light min-vh-100">
      <section className="container py-5">
        {/* ENCABEZADO CONTEXTO */}
        <header className="mb-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Módulo · Catálogo mayorista
          </span>
          <h1 className="fw-bold text-primary">Catálogo de productos</h1>
          <p className="text-muted">
            Vista del catálogo mayorista de ZofriConnect. Aquí las empresas
            usuarias pueden publicar productos y recibir solicitudes de
            cotización desde la misma plataforma.
          </p>
        </header>

        {/* BOTÓN FORMULARIO */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-secondary">
            Productos registrados:{" "}
            <span className="badge bg-primary">
              {items.length} producto{items.length === 1 ? "" : "s"}
            </span>
          </h5>

          <button
            className="btn btn-success"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cerrar formulario" : "Crear producto"}
          </button>
        </div>

        {/* FORMULARIO CREACIÓN PRODUCTO */}
        {showForm && (
          <div className="card border-0 shadow-sm p-3 mb-4">
            <h4 className="fw-bold text-primary mb-3">Nuevo producto</h4>
            <p className="text-muted small mb-3">
              Completa los datos del producto mayorista que será visible en el
              catálogo digital de ZofriConnect.
            </p>

            <form onSubmit={crearProducto} className="row g-3">
              {/* Empresa */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">
                  Empresa usuaria
                </label>
                <select
                  className="form-control"
                  value={selectedEmpresa}
                  onChange={(e) => setSelectedEmpresa(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Empresa</option>
                  {empresas.length > 0 ? (
                    empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nombre || empresa.nombre_fantasia}
                      </option>
                    ))
                  ) : (
                    <option>No hay empresas disponibles</option>
                  )}
                </select>
              </div>

              {/* Categoría */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">
                  Categoría / rubro
                </label>
                <select
                  className="form-control"
                  value={selectedCategoria}
                  onChange={(e) => setSelectedCategoria(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Categoría</option>
                  {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))
                  ) : (
                    <option>No hay categorías disponibles</option>
                  )}
                </select>
              </div>

              {/* Nombre */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Nombre</label>
                <input
                  className="form-control"
                  placeholder="Ej: Lote de notebooks 14''"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              {/* Precio */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">
                  Precio referencial mayorista
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Ej: 150000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>

              {/* Descripción */}
              <div className="col-12">
                <label className="form-label fw-semibold small">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Detalle del producto, condición de venta mayorista, etc."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>

              {/* Imagen */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">
                  Imagen (subida a Cloudinary)
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
                <p className="small text-muted mt-1">
                  Formato JPG o PNG. Se almacenará mediante el endpoint de
                  imagen del backend.
                </p>
              </div>

              {/* Botón guardar */}
              <div className="col-12 text-end">
                <button className="btn btn-primary" type="submit">
                  Guardar producto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ERRORES */}
        {err && <div className="alert alert-danger">{err}</div>}

        {/* LISTADO DE PRODUCTOS */}
        <section className="row g-4 mt-2">
          {items.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <article className="card h-100 border-0 shadow-sm product-card">
                {p.imagen_url && (
                  <div className="ratio ratio-4x3 bg-light">
                    <img
                      src={p.imagen_url}
                      alt={p.nombre}
                      className="card-img-top rounded-top object-fit-cover"
                    />
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold mb-1">{p.nombre}</h6>

                  <p className="card-text fw-semibold text-primary mb-1">
                    ${String(p.precio)}
                  </p>

                  <p className="card-text small text-muted flex-grow-1">
                    {p.descripcion ||
                      "Producto publicado por empresa usuaria del recinto amurallado ZOFRI."}
                  </p>

                  <button
                    className="btn btn-outline-primary btn-sm w-100 mt-2"
                    onClick={() => solicitar(p)}
                  >
                    Solicitar cotización
                  </button>
                </div>
              </article>
            </div>
          ))}

          {items.length === 0 && !err && (
            <div className="col-12 text-center py-5">
              <h5 className="fw-bold text-primary mb-2">Sin productos aún</h5>
              <p className="text-muted">
                Puedes crear el primer producto usando el botón{" "}
                <span className="fw-semibold">“Crear producto”</span>.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
