import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';

export default function Project() {
  return (
    <ProjectComponent
      name="Visita de JEF Galicia a las instituciones europeas"
      description="JEF Galicia ofrecerá a sus socios la posibilidad de visitar las instituciones europeas en Bruselas para conocer su trabajo y mejorar sus oportunidades laborales, a través de los programas de financiamiento de la UE."
      email="eu.institutional.visit@projects.jef.gal"
    >
    </ProjectComponent>
  );
}
