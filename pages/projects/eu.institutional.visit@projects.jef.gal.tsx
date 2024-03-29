import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import proj_img from '../../public/EU_visit.jpeg';
import ProjectComponent from '../../components/Project';
import { FormattedMessage } from 'react-intl';

export default function Project() {
  return (
    <ProjectComponent
      name={<FormattedMessage defaultMessage="Visita de JEF Galicia a las instituciones europeas"></FormattedMessage>}
      description={<FormattedMessage defaultMessage="JEF Galicia ofrecerá a sus socios la posibilidad de visitar las instituciones europeas en Bruselas para conocer su trabajo y mejorar sus oportunidades laborales, a través de los programas de financiamiento de la UE."></FormattedMessage>}
      email="eu.institutional.visit@projects.jef.gal"
      image={
        <>
          <Image src={proj_img} alt={"Imaxe descritiva do proxecto"} className="rounded-lg rounded-b-none" />
          <div className='py-2 text-sm'><FormattedMessage defaultMessage="Imaxe xerada empregando IA"/></div>
        </>
      }
    >
    </ProjectComponent>
  );
}
