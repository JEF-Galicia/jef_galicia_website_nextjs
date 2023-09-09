import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';

export default function Project() {
  return (
    <ProjectComponent
      name="Excursión JEF-AECP"
      description="Se planea realizar una excursión para nuestros socios a la Agencia Europea de Control de la Pesca en Vigo, para aprender sobre su funcionamiento y los retos que enfrentan en el sector pesquero, ya que Vigo es el puerto pesquero más grande de Europa y supone un pilar fundamental para la economía gallega."
      email="jef.aecp.excursion@projects.jef.gal"
    >
    </ProjectComponent>
  );
}
