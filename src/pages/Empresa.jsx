import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Empresa() {
  const [misProductos, setMisProductos] = useState([]);
  const [miEmpresa, setMiEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  const cargar = async () => {
    try {
      setLoading(true);
      const emp = await api.get("/empresas/mi_empresa/");
      setMiEmpresa(emp.data);

      if (emp.data) {
        const r = await api.get(`/productos/?empresa=${emp.data.id}`);
        setMisProductos(r.data.results || r.data); // soporta paginación o lista simple
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron cargar los datos de tu empresa.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const onCrear = async (data) => {
    try {
      await api.post("/productos/", data);
      await cargar();
      reset({ nombre: "", precio: "", categoria: "", imagen_url: "" });
      Swal.fire("OK", "Producto creado", "success");
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "No se pudo crear el producto", "error");
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

  useEffect(() => {
    cargar();
  }, []);

  // Si el usuario aún no está vinculado a una empresa
  if (!loading && !miEmpresa) {
    return (
      <main className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="alert alert-warning">
            <h4 className="alert-heading fw-bold text-primary">
              Sin empresa vinculada
            </h4>
            <p className="mb-0">
              Para gestionar productos en ZofriConnect, tu usuario debe estar
              asociado a una empresa usuaria del recinto amurallado ZOFRI. 
              Solicita a un administrador que vincule tu cuenta o completa el proceso
              de registro correspondiente.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-light min-vh-100">
      <div className="container py-5">
        {/* HEADER PANEL */}
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

        {/* INFO EMPRESA + STATS */}
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

        {/* LOADING */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="text-muted">Cargando información de tu empresa...</p>
          </div>
        )}

        {!loading && (
          <section className="row g-4">
            {/* FORM CREAR PRODUCTO */}
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

                    <div>
                      <label className="form-label small fw-semibold">
                        ID categoría (opcional)
                      </label>
                      <input
                        className="form-control"
                        placeholder="Ej: 1 (Electrónica)"
                        {...register("categoria")}
                      />
                      <div className="form-text small">
                        En el prototipo se usa el ID de la categoría ya registrada
                        en el backend.
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

            {/* LISTADO DE PRODUCTOS */}
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
