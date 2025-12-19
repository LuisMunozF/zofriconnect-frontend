import React from 'react';
import Carrousel from '../components/Carrousel';
import Banner from '../components/Banner';
import Beneficios from '../components/Beneficios';
import Categorias from '../components/CategoriasCentral';
import Footer from '../components/Footer';
import ProductCarousel from '../components/CarouselProductos';
// ------------------------
// Nuevo y funcional
// ------------------------
export default function Home() {
  return (
    <main className="bg-light">

      {/* HERO CAROUSEL */}
      <section className="mb-5">
        <Carrousel />
      </section>

      {/* BANNER PRINCIPAL */}
      <section className="mb-5">
        <Banner />
      </section>

      {/* SECCIÓN: ¿QUÉ ES ZOFRICONNECT? */}
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h2 className="fw-bold text-primary mb-3">
              ¿Qué es ZofriConnect?
            </h2>
            <p className="text-muted">
              ZofriConnect es una plataforma digital que moderniza la gestión
              comercial de las empresas usuarias del recinto amurallado ZOFRI,
              conectándolas con compradores mayoristas de Chile y el extranjero.
            </p>

            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                ✔ Publica productos y catálogo mayorista.
              </li>
              <li className="mb-2">
                ✔ Recibe solicitudes de cotización directa.
              </li>
              <li className="mb-2">
                ✔ Muestra la ubicación de tu empresa en el mapa interactivo ZOFRI.
              </li>
              <li className="mb-2">
                ✔ Incrementa la visibilidad hacia clientes B2B.
              </li>
            </ul>

            <a href="/registro" className="btn btn-primary mt-3">
              Registrar mi empresa
            </a>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://zofri.cl/wp-content/uploads/2021/09/Recinto-Amurallado.png"
              alt="Zofri"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="mb-5">
        <Beneficios />
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="mb-5">
        <ProductCarousel />
      </section>

      {/* CATEGORÍAS */}
      <section className="mb-5">
        <Categorias />
      </section>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <section className="py-5 bg-white shadow-sm">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-4">
              <h2 className="fw-bold text-primary">+150</h2>
              <p className="text-muted">Empresas registradas*</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold text-primary">+1200</h2>
              <p className="text-muted">Productos publicados*</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold text-primary">+800</h2>
              <p className="text-muted">Solicitudes de cotización*</p>
            </div>
          </div>
          <p className="small text-muted mt-3">
            *Datos referenciales para prototipo académico
          </p>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold text-primary mb-3">
          ¿Listo para digitalizar tu empresa en ZOFRI?
        </h2>
        <p className="text-muted mb-4">
          Únete a ZofriConnect y comienza a mostrar tus productos mayoristas
          al mundo.
        </p>
        <a href="/registro" className="btn btn-primary btn-lg px-5 py-2">
          Crear cuenta empresarial
        </a>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}
