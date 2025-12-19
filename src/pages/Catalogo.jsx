 // ------------------------
  // Nuevo y funcional
  // ------------------------
// ... (imports existentes)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // NUEVO: importar useNavigate
import api from "../api/axios";

export default function Catalogo() {
  const navigate = useNavigate(); // NUEVO: hook para navegación
  
  // ... (todos tus estados se mantienen igual)
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [miEmpresa, setMiEmpresa] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  
  const [modalCotizacion, setModalCotizacion] = useState({
    abierto: false,
    producto: null,
    mensaje: "",
    cantidad: 1,
    contacto: "",
    enviando: false,
  });

  // ... (todos tus useEffects se mantienen igual)
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        setUsuario(JSON.parse(stored));
      } catch (e) {
        console.error("Error al parsear usuario en catálogo:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (usuario && usuario.rol === "EMPRESA") {
      api
        .get("/empresas/mi_empresa/")
        .then((r) => {
          setMiEmpresa(r.data || null);
        })
        .catch((e) => {
          console.error("Error al cargar mi_empresa en catálogo:", e);
          setMiEmpresa(null);
        });
    }
  }, [usuario]);

  const cargarProductos = () => {
    api
      .get("/productos/")
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : r.data.results || [];
        setItems(data);
      })
      .catch((e) => setErr(e.message));
  };

  useEffect(() => {
    cargarProductos();

    api
      .get("/empresas/")
      .then((r) => {
        const empresasData = Array.isArray(r.data)
          ? r.data
          : r.data?.results || [];
        setEmpresas(empresasData);
      })
      .catch(() => setErr("Error al cargar empresas"));

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

  // ------------------------
  // SOLICITAR COTIZACIÓN (AHORA CON MODAL)
  // ------------------------
  const abrirModalCotizacion = (producto) => {
    const storedUser = localStorage.getItem("usuario");
    if (!storedUser) {
      alert("Debes iniciar sesión como cliente para solicitar una cotización.");
      return;
    }
    const usuario = JSON.parse(storedUser);
    if (usuario.rol !== "CLIENTE") {
      alert("Solo los clientes pueden solicitar cotizaciones.");
      return;
    }
    setModalCotizacion({
      abierto: true,
      producto,
      mensaje: "",
      cantidad: 1,
      contacto: "",
      enviando: false,
    });
  };

  const enviarCotizacion = async () => {
    const { producto, mensaje, cantidad, contacto } = modalCotizacion;
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token_access");

    if (!mensaje || mensaje.trim().length < 10) {
      alert("Debes escribir un mensaje de al menos 10 caracteres.");
      return;
    }

    if (!cantidad || cantidad <= 0) {
      alert("Debes indicar una cantidad mayor a 0.");
      return;
    }

    let usuario = null;
    try {
      usuario = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error parseando usuario:", e);
      return;
    }

    try {
      setModalCotizacion((prev) => ({ ...prev, enviando: true }));

      await api.post(
        "/cotizaciones/",
        {
          empresa: producto.empresa,
          producto: producto.id,
          solicitante: usuario.nombre || usuario.correo,
          mensaje,
          cantidad,
          contacto,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Cotización enviada correctamente.");
      setModalCotizacion({ abierto: false, producto: null, mensaje: "", cantidad: 1, contacto: "", enviando: false });
    } catch (e) {
      console.error("Error al enviar cotización:", e?.response?.data || e);
      alert("❌ No se pudo enviar la cotización.");
      setModalCotizacion((prev) => ({ ...prev, enviando: false }));
    }
  };

  // ------------------------
  // CREAR PRODUCTO
  // ------------------------
  const crearProducto = async (e) => {
    e.preventDefault();
    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero)) {
      alert("El precio debe ser un número válido");
      return;
    }
    try {
      const res = await api.post("/productos/", {
        nombre,
        descripcion,
        precio: precioNumero,
        empresa: selectedEmpresa,
        categoria: selectedCategoria,
      });

      const productoId = res.data.id;

      if (imagen) {
        const formData = new FormData();
        formData.append("imagen", imagen);
        await api.post(`/productos/${productoId}/subir_imagen/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen(null);
      setShowForm(false);
      setSelectedEmpresa("");
      setSelectedCategoria("");

      cargarProductos();
      alert("Producto creado con éxito 🎉");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      const detail =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        "Error al crear el producto.";
      alert(detail);
    }
  };

  // NUEVO: Función para redirigir a /empresa
  const irAPanelEmpresa = () => {
    navigate("/empresa");
  };

  const esEmpresa = usuario && usuario.rol === "EMPRESA";
  const empresaAprobada = miEmpresa && miEmpresa.aprobada === true;
  const empresaPendiente = miEmpresa && miEmpresa.aprobada === false;

  return (
    <main className="bg-light min-vh-100">
      <section className="container py-5">
        {/* ENCABEZADO */}
        <header className="mb-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Módulo · Catálogo mayorista
          </span>
          <h1 className="fw-bold text-primary">Catálogo de productos</h1>
          <p className="text-muted">
            Vista del catálogo mayorista de ZofriConnect.
          </p>
        </header>

        {/* Botón Crear producto - MODIFICADO */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 text-secondary">
            Productos registrados:{" "}
            <span className="badge bg-primary">
              {items.length} producto{items.length === 1 ? "" : "s"}
            </span>
          </h5>

          {esEmpresa && empresaAprobada && (
            <button
              className="btn btn-success"
              onClick={irAPanelEmpresa} // CAMBIADO: ahora usa la función de navegación
            >
              Crear producto
            </button>
          )}
        </div>

        {/* Mensajes */}
        {(!usuario || !esEmpresa) && (
          <p className="text-muted mb-3">
            El catálogo es público. La creación de productos está disponible solo para empresas.
          </p>
        )}

        {esEmpresa && !miEmpresa && (
          <p className="text-warning mb-3">
            Tu cuenta está registrada como EMPRESA, pero aún no tiene empresa vinculada.
          </p>
        )}

        {esEmpresa && empresaPendiente && (
          <div className="alert alert-warning mb-3">
            <h6 className="fw-bold text-primary mb-1">
              Tu empresa está pendiente de aprobación
            </h6>
            <p className="mb-0 small">
              Aún no puedes crear productos desde el catálogo.
            </p>
          </div>
        )}

        {/* FORMULARIO CREACIÓN PRODUCTO - ELIMINADO porque ya no se muestra aquí */}
        {/* Este formulario completo ha sido eliminado ya que ahora se redirige a /empresa */}

        {err && <div className="alert alert-danger">{err}</div>}

        {/* LISTADO PRODUCTOS */}
        <section className="row g-4 mt-2">
          {items.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <article className="card h-100 border-0 shadow-sm product-card">
                {p.imagen_url && (
                  <div className="ratio ratio-4x3 bg-light">
                    <img src={p.imagen_url} alt={p.nombre} className="card-img-top rounded-top object-fit-cover"/>
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold mb-1">{p.nombre}</h6>
                  <p className="card-text fw-semibold text-primary mb-1">${String(p.precio)}</p>
                  <p className="card-text small text-muted flex-grow-1">{p.descripcion || "Sin descripción"}</p>
                  <p className="small text-primary fw-semibold mt-2">Publicado por: {p.empresa_nombre || "Empresa desconocida"}</p>
                  <button className="btn btn-outline-primary btn-sm w-100 mt-2" onClick={() => abrirModalCotizacion(p)}>
                    Solicitar cotización
                  </button>
                </div>
              </article>
            </div>
          ))}

          {items.length === 0 && !err && (
            <div className="col-12 text-center py-5">
              <h5 className="fw-bold text-primary mb-2">Sin productos aún</h5>
              <p className="text-muted">Puedes crear el primer producto usando el botón “Crear producto”.</p>
            </div>
          )}
        </section>

        {/* ----------------------- */}
        {/* MODAL COTIZACIÓN */}
        {/* ----------------------- */}
        {modalCotizacion.abierto && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Solicitar cotización</h5>
                  <button type="button" className="btn-close" onClick={() => setModalCotizacion({ abierto: false })}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Producto:</strong> {modalCotizacion.producto.nombre}</p>
                  <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={modalCotizacion.cantidad}
                      onChange={(e) => setModalCotizacion({ ...modalCotizacion, cantidad: Number(e.target.value) })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensaje (mín. 10 caracteres)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={modalCotizacion.mensaje}
                      onChange={(e) => setModalCotizacion({ ...modalCotizacion, mensaje: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo o teléfono (opcional)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={modalCotizacion.contacto}
                      onChange={(e) => setModalCotizacion({ ...modalCotizacion, contacto: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setModalCotizacion({ abierto: false })}>Cancelar</button>
                  <button className="btn btn-primary" disabled={modalCotizacion.enviando} onClick={enviarCotizacion}>
                    {modalCotizacion.enviando ? "Enviando..." : "Enviar cotización"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}