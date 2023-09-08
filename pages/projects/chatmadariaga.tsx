import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';

export default function Project() {
  return (
    <ProjectComponent
      name="ChatMadariaga"
      description="ChatMadariaga es una Inteligencia Artificial conversacional en el estilo de ChatGPT, pero que habla como Salvador de Madariaga, uno de los padres de la Unión Europea. El bot puede responder preguntas sobre la UE y cuestiones personales."
      email="chatmadariaga@projects.jef.gal"
      >
      </ProjectComponent>
  );
}
