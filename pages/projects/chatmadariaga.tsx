import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import proj_img from '../../public/ChatMadariaga.jpeg';
import ProjectComponent from '../../components/Project';

export default function Project() {
  return (
    <ProjectComponent
      name="ChatMadariaga"
      description="ChatMadariaga es una Inteligencia Artificial conversacional en el estilo de ChatGPT, pero que habla como Salvador de Madariaga, uno de los padres de la Unión Europea. El bot puede responder preguntas sobre la UE y cuestiones personales."
      email="chatmadariaga@projects.jef.gal"
      image={
        <>
          <Image src={proj_img} alt={"Imaxe descritiva do proxecto"} className="rounded-lg rounded-b-none" />
          <div className='py-2 text-sm'>Imaxe xerada empregando IA</div>
        </>
      }
    >
    </ProjectComponent>
  );
}
