import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Empresa(){
  const [misProductos, setMisProductos] = useState([]);
  const [miEmpresa, setMiEmpresa] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const cargar = async () => {
    const emp = await api.get("/empresas/mi_empresa/");
    setMiEmpresa(emp.data);
    if (emp.data) {
      const r = await api.get(`/productos/?empresa=${emp.data.id}`);
      setMisProductos(r.data.results || r.data); // si usas paginación por páginas
    }
  };

  const onCrear = async (data) => {
    try {
      await api.post("/productos/", data);
      await cargar();
      reset({ nombre:"", precio:"", categoria:"" });
      Swal.fire("OK", "Producto creado", "success");
    } catch {
      Swal.fire("Error", "No se pudo crear", "error");
    }
  };

  const onEliminar = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await api.delete(`/productos/${id}/`);
    cargar();
  };

  useEffect(()=>{ cargar(); },[]);

  if (!miEmpresa) {
    return <div className="container py-4"><h4>Vincula tu usuario a una Empresa para gestionar productos.</h4></div>;
  }

  return (
    <div className="container py-4">
      <h3>Mi Empresa: {miEmpresa?.nombre}</h3>

      <div className="row mt-3">
        <div className="col-md-6">
          <h5>Crear producto</h5>
          <form className="vstack gap-2" onSubmit={handleSubmit(onCrear)}>
            <input className="form-control" placeholder="Nombre" {...register("nombre", {required:true})} />
            <input className="form-control" placeholder="Precio" type="number" {...register("precio", {required:true})} />
            <input className="form-control" placeholder="ID Categoría (opcional)" {...register("categoria")} />
            <input className="form-control" placeholder="URL de imagen (opcional)" {...register("imagen_url")} />
            <button className="btn btn-primary" type="submit">Guardar</button>
          </form>
        </div>

        <div className="col-md-6">
          <h5>Mis productos</h5>
          <ul className="list-group">
            {misProductos.map(p=>(
              <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
                <span>{p.nombre} — ${p.precio}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>onEliminar(p.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
