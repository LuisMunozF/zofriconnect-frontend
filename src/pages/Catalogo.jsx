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
    // Cargar productos
    api
      .get("/productos/")
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : r.data.results || [];
        setItems(data);
      })
      .catch((e) => setErr(e.message));

    // Obtener empresas y categorías para el formulario
    api
      .get("/empresas/") // Cargar las empresas
      .then((r) => {
        // Asegurarse de acceder a la clave `results` si no es un array
        const empresasData = r.data?.results || [];
        setEmpresas(empresasData);
      })
      .catch((e) => setErr("Error al cargar empresas"));

    api
      .get("/categorias/") // Cargar las categorías
      .then((r) => {
        // Asegurarse de acceder a la clave `results` si no es un array
        const categoriasData = r.data?.results || [];
        setCategorias(categoriasData);
      })
      .catch((e) => setErr("Error al cargar categorías"));
  }, []);

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

    // Asegúrate de que el precio sea un número
    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero)) {
      alert("El precio debe ser un número válido");
      return;
    }

    try {
      // Primero crear el producto
      const res = await api.post("/productos/", {
        nombre,
        descripcion,
        precio: precioNumero, // Enviar precio como número
        empresa: selectedEmpresa,
        categoria: selectedCategoria,
      });

      const productoId = res.data.id;

      // Subir la imagen si existe
      if (imagen) {
        const formData = new FormData();
        formData.append("imagen", imagen);

        // Subir imagen a Cloudinary
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

      // Volver a cargar los productos
      cargarProductos();
      alert("Producto creado con éxito 🎉");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto.");
    }
  };

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

  return (
    <div>
      <h3>Catálogo</h3>

      {/* Botón para mostrar el formulario de creación de producto */}
      <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar formulario" : "Crear producto"}
      </button>

      {/* Formulario para crear un producto */}
      {showForm && (
        <div className="card p-3 mb-4">
          <h4>Crear nuevo producto</h4>
          <form onSubmit={crearProducto}>
            {/* Dropdown para seleccionar empresa */}
            <select
              className="form-control mb-2"
              value={selectedEmpresa}
              onChange={(e) => setSelectedEmpresa(e.target.value)}
              required
            >
              <option value="">Seleccionar Empresa</option>
              {empresas.length > 0 ? (
                empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nombre}
                  </option>
                ))
              ) : (
                <option>No hay empresas disponibles</option>
              )}
            </select>

            {/* Dropdown para seleccionar categoría */}
            <select
              className="form-control mb-2"
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

            <input
              className="form-control mb-2"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
            />
            <button className="btn btn-primary" type="submit">
              Guardar producto
            </button>
          </form>
        </div>
      )}

      {/* Mostrar errores si los hay */}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="row">
        {items.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card mb-3">
              {p.imagen_url && (
                <img
                  src={p.imagen_url}
                  alt={p.nombre}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">${String(p.precio)}</p>

                {/* Botón para pedir cotización de ese producto */}
                <button className="btn btn-outline-primary btn-sm" onClick={() => solicitar(p)}>
                  Solicitar cotización
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && !err && <p>Sin productos aún.</p>}
      </div>
    </div>
  );
}
