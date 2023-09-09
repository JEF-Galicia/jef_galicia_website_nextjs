import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';

export default function Project() {
  return (
    <ProjectComponent
      name="La importancia de la diversidad y la inclusión en la membresía de JEF Europa"
      description="La diversidad y la inclusión son importantes en la membresía de JEF Europa para fomentar el debate en torno a temas innovadores y especializados. Este proyecto busca dar voz a personas con perfiles poco comunes dentro de JEF Europa para darles voz y sacar a la luz la diversidad de contextos existente dentro de nuestra red."
      email="diversity.inclusion.europe@projects.jef.gal"
      >
      </ProjectComponent>
  );
}
