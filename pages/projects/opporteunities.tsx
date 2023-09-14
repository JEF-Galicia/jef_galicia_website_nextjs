import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';
import { FormattedMessage } from 'react-intl';

export default function Project() {
  return (
    <ProjectComponent
      name="OpportEUnities"
      description={<FormattedMessage defaultMessage="OpportEUnities es un proyecto que informa a los jóvenes sobre oportunidades de estudiar, hacer voluntariado y realizar prácticas en el extranjero. Ofrecemos charlas, conferencias y ferias informativas en distintas ciudades y centros educativos."></FormattedMessage>}
      email="opporteunities@projects.jef.gal"
      >
      </ProjectComponent>
  );
}
