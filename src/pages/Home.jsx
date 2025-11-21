import React from 'react';
import Carrousel from '../components/Carrousel';
import Banner from '../components/Banner';
import Beneficios from '../components/Beneficios';
import Categorias from '../components/CategoriasCentral';
import Footer from '../components/Footer';
import ProductCarousel from '../components/CarouselProductos';  

export default function Home() {
  return (
    <div>
      <Carrousel />
      <Banner />
      <Beneficios />
      <ProductCarousel />
      <Categorias />
      <Footer />
    </div>
  );
}
