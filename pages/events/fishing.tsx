import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import imagenEvento from '../../public/ImagenPesca3.png';
import EUCofundedLogo from '../../public/Cofunded_EU_Logo.png';
import JEFEuropeLogo from '../../public/JEF_EU_Logo.png';
import JEFGalLogo from '../../public/Main_Imagetype.svg';
import ButtonComponent from '../../components/Button';
import { FormattedMessage, useIntl } from 'react-intl';

export default function Fishing() {
  const intl = useIntl();
  return (
    <>
      <BoxComponent>
        <div className="flex flex-col justify-start mb-6 w-full bg-opacity-30 hover:bg-opacity-100 bg-primary text-white font-semibold text-sm px-6 py-3 leading-none border rounded transition border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30  ">
          <h1 className='text-xl mb-4'>
            <FormattedMessage defaultMessage="Este evento finalizou."/>
          </h1>
          <p>
            <FormattedMessage defaultMessage="A información desta páxina ofrécese a modo de referencia, pero xa non está actualizada."/>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-12 px-4 md:px-16 pb-6 items-center">
          <Image src={EUCofundedLogo} alt="Co-funded by the EU" className="" />
          <Image src={JEFEuropeLogo} alt="JEF Europa" className="" />
          <Image src={JEFGalLogo} alt="JEF Galicia" className="" />
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">
          <FormattedMessage defaultMessage="A Actualidade da Política Pesqueira na Unión Europea e Galicia"/>
        </h1>
        {/*<div className="h-22 w-100 flex mx-0 mb-4 flex-col place-items-center rounded">
          <Image src={imagenEvento} alt="Imaxe do evento" className="rounded" />
        </div>*/}
        {/*
        <div className="flex justify-start w-full mb-6">
          <a
            className="w-full md:w-full flex-grow"
            href="https://www.eventbrite.es/e/entradas-a-actualidade-da-politica-pesqueira-ue-e-galicia-620268839797?aff=jefgal"
          >
            <ButtonComponent className="w-full bg-opacity-30 hover:bg-opacity-100 bg-primary text-white">
              Reserva o teu sitio! 🪑
            </ButtonComponent>
          </a>
        </div>
      */}

        <h2 className=''><span className="font-semibold"><FormattedMessage defaultMessage="Cando?"/></span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className='font-medium'><FormattedMessage defaultMessage="🗓️ 7 de xullo, 2023"/></p>
          <p className='font-medium'><FormattedMessage defaultMessage="⌚ 17:30h - 19:00h"/></p>
        </div>
        <h2 className=''><span className="font-semibold"><FormattedMessage defaultMessage="Onde?"/></span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className="">
            <span className="font-medium"><FormattedMessage defaultMessage="Sede Afundación"/></span><br />
            <span className="font-medium"><FormattedMessage defaultMessage="Sala de Prensa"/></span><br />
            Cantón Grande, 8<br />
            15001 A Coruña
          </p>
          <a
            href="https://goo.gl/maps/zPo5YXCYU3R7H8dz7"
          >
            <ButtonComponent className="w-full md:w-auto mt-2 mb-2">
              <FormattedMessage defaultMessage="📍 Tes aquí a direción do Google Maps"/>
            </ButtonComponent>
          </a>
        </div>

        <p className="mb-6">
          <FormattedMessage defaultMessage="Descobre a Actualidade da Política Pesqueira na Unión Europea e Galicia!"/>
        </p>
        <p className="mb-6">
          <FormattedMessage defaultMessage="Exploraremos a gobernanza mariña, a sustentabilidade e a tecnoloxía na pesca. Coñece a historia e as últimas transformacións da Política Pesqueira Común, así como os eventos recentes que reavivaron o debate entre a protección ambiental e a industria pesqueira."/>
        </p>
        <p className="mb-6">
          <FormattedMessage defaultMessage="Contaremos con relatores de renome:"/>
        </p>
        <ul className="">
          <li>
            <FormattedMessage defaultMessage="👩‍🦰 Cristina Pichel, directora xeral de Xuventude, Participación e Voluntariado da Xunta de Galicia"/>
          </li>
          <li>
            <FormattedMessage defaultMessage="🗳 Ana Miranda, deputada do BNG no Parlamento Europeo"/>
          </li>
          <li>
            <FormattedMessage defaultMessage="🧰 Fernando González Laxe, ex-presidente da Xunta de Galicia e director do Instituto Universitario de Estudos Marítimos"/>
          </li>
          <li>
            <FormattedMessage defaultMessage="🐠 Martín Fernández, presidente da Autoridade Portuaria da Coruña"/>
          </li>
        </ul>
        <p className="mb-6">
          <FormattedMessage defaultMessage="Ademais, haberá oportunidades para facer preguntas e compartir ideas con outras asistentes."/>
        </p>

        <p className="mb-6">
          <FormattedMessage defaultMessage="Non perdas a oportunidade de entender a complexa realidade da política pesqueira e o seu impacto na nosa rexión. Rexístrate agora, e forma parte deste diálogo crucial!"/>
        </p >
        <p className="mt-6 mb-2 font-medium"><FormattedMessage defaultMessage="Esperámoste! 🙌"/></p>

      </BoxComponent >
    </>
  );
}
