import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import image1 from '../../public/Banco_Por_Europa.jpg';
import ProjectComponent from '../../components/Project';

export default function Project() {
  return (
    <ProjectComponent
      name="EUlections"
      description="EUlections informa al público general sobre las distintas propuestas de los partidos que se presentan a las elecciones europeas, en base a sus propuestas que toquen temas europeos. A través de publicaciones en nuestras redes sociales, buscamos dar difusión a la implicación que las políticas europeas tienen sobre la realidad gallega, expresada a través del voto en las elecciones."
      email="eulections@projects.jef.gal"
      >
      </ProjectComponent>
  );
}
