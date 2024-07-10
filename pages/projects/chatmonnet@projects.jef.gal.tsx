import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import proj_img from '../../public/ChatMonnet.jpg';
import ProjectComponent from '../../components/Project';
import { FormattedMessage } from 'react-intl';

export default function Project() {
  return (
    <ProjectComponent
      name="ChatMonnet"
      description={<FormattedMessage defaultMessage="ChatMonnet es una Inteligencia Artificial conversacional en el estilo de ChatGPT, pero que habla como Jean Monnet, uno de los padres de la Unión Europea. El bot puede responder preguntas sobre la UE y cuestiones personales. El proyecto ha sido desarrollado como parte de una colaboración internacional con JEF Bordeaux."></FormattedMessage>}
      email="chatmonnet@projects.jef.gal"
      image={
        <>
          <Image src={proj_img} alt={"Imaxe descritiva do proxecto"} className="rounded-lg rounded-b-none" />
        </>
      }
    >
    </ProjectComponent>
  );
}
