 // ------------------------
  // Nuevo y funcionales
  // ------------------------
// ... (imports previos se mantienen igual)
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Empresa() {
  const [misProductos, setMisProductos] = useState([]);
  const [miEmpresa, setMiEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  // Estados para usuario y verificación de sesión
  const [usuario, setUsuario] = useState(null);
  const [revisado, setRevisado] = useState(false);
  
  // NUEVO: Estado para almacenar la lista de categorías
  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(false);

  // Leer usuario desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUsuario(parsed);
      } catch (e) {
        console.error("Error al parsear usuario almacenado en Empresa.jsx:", e);
      }
    }
    setRevisado(true);
  }, []);

  // NUEVO: Cargar categorías desde el endpoint correcto de tu API
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setCargandoCategorias(true);
        // IMPORTANTE: Cambia esta URL por tu endpoint real de categorías
        // Probablemente sea una de estas opciones:
        // 1. "/categorias/"
        // 2. "/api/categorias/"
        // 3. "/core/categorias/"
        const response = await api.get("/categorias/");
        
        // Verifica la estructura de la respuesta en la consola
        console.log("Respuesta de categorías:", response.data);
        
        // Dependiendo de cómo esté estructurada tu API:
        // Si response.data es un array directamente:
        if (Array.isArray(response.data)) {
          setCategorias(response.data);
        } 
        // Si response.data tiene una propiedad results (paginación):
        else if (response.data.results && Array.isArray(response.data.results)) {
          setCategorias(response.data.results);
        }
        // Si es otro formato:
        else {
          console.warn("Formato de categorías no reconocido:", response.data);
          setCategorias([]);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        // No muestres alerta aquí para no interrumpir el flujo
        setCategorias([]);
      } finally {
        setCargandoCategorias(false);
      }
    };
    
    if (usuario && usuario.rol === "EMPRESA") {
      cargarCategorias();
    }
  }, [usuario]);

  const cargar = async () => {
    try {
      setLoading(true);
      const emp = await api.get("/empresas/mi_empresa/");
      setMiEmpresa(emp.data);

      if (emp.data) {
        const r = await api.get(`/productos/?empresa=${emp.data.id}`);
        setMisProductos(r.data.results || r.data);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los datos de tu empresa.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onCrear = async (data) => {
    try {
      const payload = { ...data };

      // Si categoría llega vacía (""), la quitamos del payload
      if (!payload.categoria) {
        delete payload.categoria;
      }

      // Si descripción llega vacía, la quitamos del payload
      if (!payload.descripcion) {
        delete payload.descripcion;
      }

      await api.post("/productos/", payload);
      await cargar();
      reset({ 
        nombre: "", 
        precio: "", 
        categoria: "", 
        imagen_url: "", 
        descripcion: "" // NUEVO: resetear descripción también
      });
      Swal.fire("OK", "Producto creado", "success");
    } catch (e) {
      console.error("Error al crear producto:", e?.response?.data || e);
      const detalle =
        e?.response?.data?.detail ||
        e?.response?.data?.empresa?.[0] ||
        e?.response?.data?.categoria?.[0] ||
        e?.response?.data?.descripcion?.[0] || // NUEVO: manejo de error para descripción
        "No se pudo crear el producto";
      Swal.fire("Error", detalle, "error");
    }
  };

  const onEliminar = async (id) => {
    const confirmacion = window.confirm("¿Eliminar producto?");
    if (!confirmacion) return;

    try {
      await api.delete(`/productos/${id}/`);
      cargar();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "No se pudo eliminar el producto", "error");
    }
  };

  // Cargar datos SOLO si el usuario es EMPRESA
  useEffect(() => {
    if (usuario && usuario.rol === "EMPRESA") {
      cargar();
    }
  }, [usuario]);

  // ---------- VISTAS SEGÚN SESIÓN / ROL ----------
  // (Todo este bloque se mantiene IDÉNTICO)
  if (!revisado) {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="text-muted mb-0">Verificando sesión de usuario...</p>
        </div>
      </main>
    );
  }

  if (!usuario) {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-warning text-center">
            <h4 className="alert-heading fw-bold text-primary mb-2">
              Acceso solo para empresas usuarias
            </h4>
            <p className="mb-2">
              Para gestionar productos en ZofriConnect debes iniciar sesión como
              <strong> empresa usuaria</strong>.
            </p>
            <p className="mb-0">
              Usa la opción <strong>"Acceso empresas"</strong> en el menú
              superior para ingresar con tu cuenta.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (usuario.rol !== "EMPRESA") {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-danger text-center">
            <h4 className="alert-heading fw-bold mb-2">Acceso restringido</h4>
            <p className="mb-1">
              Tu rol actual es:{" "}
              <strong className="text-uppercase">{usuario.rol}</strong>.
            </p>
            <p className="mb-0">
              Solo las cuentas con rol <strong>EMPRESA</strong> pueden acceder a
              este panel de gestión de productos.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!loading && !miEmpresa) {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-warning">
            <h4 className="alert-heading fw-bold text-primary">
              Sin empresa vinculada
            </h4>
            <p className="mb-0">
              Tu usuario está registrado como <strong>EMPRESA</strong>, pero aún no
              tiene una Empresa asociada en el sistema.
              <br />
              Solicita a un administrador que vincule tu cuenta a una Empresa
              usuaria del recinto amurallado ZOFRI desde el panel de administración.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!loading && miEmpresa && miEmpresa.aprobada === false) {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-warning">
            <h4 className="fw-bold text-primary mb-2">
              Tu empresa está pendiente de aprobación
            </h4>
            <p className="mb-2">
              Aún no puedes gestionar productos en ZofriConnect. Un administrador debe
              revisar y aprobar la información de tu empresa antes de habilitar
              las funciones de publicación en el catálogo mayorista.
            </p>
            <p className="small text-muted mb-0">
              Una vez aprobada, podrás crear, editar y eliminar productos desde
              este mismo panel.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ---------- VISTA NORMAL DEL PANEL ----------
  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        {/* HEADER PANEL (se mantiene igual) */}
        <header className="mb-4">
          <span className="badge bg-primary-subtle text-primary mb-2">
            Panel de empresa usuaria
          </span>
          <h1 className="fw-bold text-primary mb-1">
            Mi empresa: {miEmpresa?.nombre}
          </h1>
          <p className="text-muted">
            Desde este panel puedes gestionar los productos que se publican en el
            catálogo mayorista de ZofriConnect y que estarán visibles para
            compradores B2B.
          </p>
        </header>

        {/* INFO EMPRESA + STATS (se mantiene igual) */}
        {miEmpresa && (
          <section className="row g-3 mb-4">
            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-2">Datos básicos de la empresa</h5>
                  <p className="mb-1">
                    <strong>Nombre:</strong> {miEmpresa.nombre}
                  </p>
                  {miEmpresa.razon_social && (
                    <p className="mb-1">
                      <strong>Razón social:</strong> {miEmpresa.razon_social}
                    </p>
                  )}
                  {miEmpresa.rut && (
                    <p className="mb-1">
                      <strong>RUT:</strong> {miEmpresa.rut}
                    </p>
                  )}
                  {miEmpresa.correo && (
                    <p className="mb-1">
                      <strong>Correo de contacto:</strong> {miEmpresa.correo}
                    </p>
                  )}
                  {miEmpresa.direccion && (
                    <p className="mb-0">
                      <strong>Ubicación en ZOFRI:</strong> {miEmpresa.direccion}
                    </p>
                  )}
                  <p className="small text-muted mt-2 mb-0">
                    Estos datos son de ejemplo según lo registrado en el backend.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h6 className="fw-bold text-secondary">Resumen rápido</h6>
                  <p className="mb-1">
                    Productos publicados:{" "}
                    <span className="badge bg-primary">
                      {misProductos.length}
                    </span>
                  </p>
                  <p className="small text-muted mb-0">
                    Los productos visibles aquí son los mismos que se muestran en
                    el catálogo general cuando los compradores buscan por empresa.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* LOADING (se mantiene igual) */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="text-muted">Cargando información de tu empresa...</p>
          </div>
        )}

        {!loading && (
          <section className="row g-4">
            {/* FORM CREAR PRODUCTO - CON DESCRIPCIÓN AÑADIDA */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h4 className="fw-bold text-primary mb-3">
                    Crear nuevo producto
                  </h4>
                  <p className="small text-muted mb-3">
                    Completa la información del producto que deseas publicar en el
                    catálogo mayorista. Puedes editar/eliminar más tarde desde este
                    mismo panel.
                  </p>

                  <form className="vstack gap-3" onSubmit={handleSubmit(onCrear)}>
                    <div>
                      <label className="form-label small fw-semibold">
                        Nombre del producto
                      </label>
                      <input
                        className="form-control"
                        placeholder="Ej: Lote de celulares gama media"
                        {...register("nombre", { required: true })}
                      />
                    </div>

                    <div>
                      <label className="form-label small fw-semibold">
                        Precio referencial mayorista
                      </label>
                      <input
                        className="form-control"
                        placeholder="Ej: 250000"
                        type="number"
                        {...register("precio", { required: true })}
                      />
                    </div>

                    {/* NUEVO: CAMPO DE DESCRIPCIÓN */}
                    <div>
                      <label className="form-label small fw-semibold">
                        Descripción del producto (opcional)
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Ej: Lote de 50 unidades de celulares Samsung Galaxy A54, desbloqueados, nuevos en caja, color negro y blanco, garantía 12 meses..."
                        rows="4"
                        {...register("descripcion")}
                      />
                      <div className="form-text small">
                        Describe las características, condiciones, especificaciones técnicas
                        o cualquier detalle relevante para los compradores B2B.
                      </div>
                    </div>

                    <div>
                      <label className="form-label small fw-semibold">
                        Categoría (opcional)
                      </label>
                      {/* Select con loading */}
                      <select
                        className="form-select"
                        {...register("categoria")}
                        disabled={cargandoCategorias}
                      >
                        <option value="">Selecciona una categoría</option>
                        {cargandoCategorias ? (
                          <option value="" disabled>Cargando categorías...</option>
                        ) : (
                          categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {/* Ajusta según los campos de tu modelo: cat.nombre, cat.name, etc. */}
                              {cat.nombre || cat.name || `Categoría ${cat.id}`}
                            </option>
                          ))
                        )}
                      </select>
                      <div className="form-text small">
                        Selecciona una categoría existente del sistema.
                        {cargandoCategorias && " (Cargando...)"}
                      </div>
                    </div>

                    <div>
                      <label className="form-label small fw-semibold">
                        URL de imagen (opcional)
                      </label>
                      <input
                        className="form-control"
                        placeholder="https://mi-imagen-en-cloudinary.jpg"
                        {...register("imagen_url")}
                      />
                      <div className="form-text small">
                        Se recomienda usar la URL entregada por Cloudinary u otro
                        servicio de almacenamiento.
                      </div>
                    </div>

                    <button className="btn btn-primary mt-2" type="submit">
                      Guardar producto
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* LISTADO DE PRODUCTOS - CON DESCRIPCIÓN AÑADIDA */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body d-flex flex-column">
                  <h4 className="fw-bold text-primary mb-3">Mis productos</h4>

                  {misProductos.length === 0 ? (
                    <p className="text-muted">
                      Aún no tienes productos publicados. Crea el primero usando el
                      formulario de la izquierda.
                    </p>
                  ) : (
                    <div className="row g-3">
                      {misProductos.map((p) => (
                        <div
                          key={p.id}
                          className="col-12 col-md-6 d-flex align-items-stretch"
                        >
                          <article className="card w-100 border-0 shadow-sm product-card">
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
                              <h6 className="fw-bold mb-1">{p.nombre}</h6>
                              <p className="mb-2 text-primary fw-semibold small">
                                ${p.precio}
                              </p>
                              {/* NUEVO: Mostrar descripción si existe */}
                              {p.descripcion && (
                                <div className="mb-2">
                                  <p className="small text-muted mb-0">
                                    <strong>Descripción:</strong> 
                                  </p>
                                  <p className="small text-muted mb-2">
                                    {p.descripcion.length > 100 
                                      ? `${p.descripcion.substring(0, 100)}...` 
                                      : p.descripcion}
                                  </p>
                                </div>
                              )}
                              <p className="small text-muted flex-grow-1 mb-2">
                                ID producto: {p.id}
                              </p>
                              <button
                                className="btn btn-sm btn-outline-danger w-100"
                                onClick={() => onEliminar(p.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}