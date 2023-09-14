import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';
import { FormattedMessage } from 'react-intl';

export default function BenchForEurope() {
  return (
    <ProjectComponent
      name="Banco por Europa"
      description={<FormattedMessage defaultMessage="Proxecto de sensibilización sobre a Unión Europea que consiste en pintar bancos coa bandeira da Unión Europea."></FormattedMessage>}
      >

      </ProjectComponent>
  );
}
