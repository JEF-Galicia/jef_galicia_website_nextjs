import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import proj_img from '../../public/DI_jef_europe.jpeg';
import ProjectComponent from '../../components/Project';
import { FormattedMessage } from 'react-intl';

export default function Project() {
  return (
    <ProjectComponent
      name={<FormattedMessage defaultMessage="La importancia de la diversidad y la inclusión en la membresía de JEF Europa"></FormattedMessage>}
      description={<FormattedMessage defaultMessage="La diversidad y la inclusión son importantes en la membresía de JEF Europa para fomentar el debate en torno a temas innovadores y especializados. Este proyecto busca dar voz a personas con perfiles poco comunes dentro de JEF Europa para darles voz y sacar a la luz la diversidad de contextos existente dentro de nuestra red."></FormattedMessage>}
      email="diversity.inclusion.europe@projects.jef.gal"
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
