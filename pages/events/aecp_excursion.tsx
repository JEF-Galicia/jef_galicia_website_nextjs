import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import imagenEvento from '../../public/EU_Handshake.jpg';
import EUCofundedLogo from '../../public/Cofunded_EU_Logo.png';
import JEFEuropeLogo from '../../public/JEF_EU_Logo.png';
import JEFGalLogo from '../../public/Main_Imagetype.svg';
import ButtonComponent from '../../components/Button';
import { FormattedMessage, useIntl } from 'react-intl';

export default function AECPExcursion() {
  const intl = useIntl();
  return (
    <>
      <BoxComponent>
        <div className="flex flex-col justify-start mb-6 w-full bg-opacity-100 hover:bg-opacity-100 bg-[#ff0000] text-white font-semibold text-sm px-6 py-3 leading-none border rounded transition border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30  ">
          <h1 className='text-xl mb-4'>
            <FormattedMessage defaultMessage="Últimas prazas!"/>
          </h1>
          <p>
            <FormattedMessage defaultMessage="Debido ao volume de inscricións recibido, non che podemos garantir unha praza na actividade. Realiza a túa inscrición a través do formulario habilitado e recibirás unha notificación pola nosa parte con antelación suficiente confirmando ou non a túa praza no evento."/>
          </p>
        </div>
        {/*
        <div className="grid grid-cols-3 gap-12 px-4 md:px-16 pb-6 items-center">
          <Image src={JEFGalLogo} alt="JEF Galicia" className="" />
        </div>
        */}
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">
          <FormattedMessage defaultMessage="Excursión á Axencia Europea de Control da Pesca (EFCA)" />
        </h1>

        <div className="h-22 w-100 flex mx-0 mb-4 flex-col place-items-center rounded">
          <Image src={imagenEvento} alt="Imaxe do evento" className="rounded" />
        </div>


        <h2 className=''><span className="font-semibold"><FormattedMessage defaultMessage="Cando?" /></span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className='font-medium'><FormattedMessage defaultMessage="🗓️ 25 de outubro, 2023" /></p>
          <p className='font-medium'><FormattedMessage defaultMessage="⌚ 10:40h" /></p>
        </div>
        {/*
        <h2 className=''><span className="font-semibold"><FormattedMessage defaultMessage="Onde?" /></span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className="">
            <span className="font-medium"><FormattedMessage defaultMessage="Sede Afundación" /></span><br />
            <span className="font-medium"><FormattedMessage defaultMessage="Sala de Prensa" /></span><br />
            Cantón Grande, 8<br />
            15001 A Coruña
          </p>
          <a
            href="https://goo.gl/maps/zPo5YXCYU3R7H8dz7"
          >
            <ButtonComponent className="w-full md:w-auto mt-2 mb-2">
              <FormattedMessage defaultMessage="📍 Tes aquí a direción do Google Maps" />
            </ButtonComponent>
          </a>
        </div>
        */}

        <p className="mb-6">
          <FormattedMessage defaultMessage="Gustaríache visitar unha axencia da Unión Europea?" />
        </p>
        <p className="mb-6">
          <FormattedMessage defaultMessage="Pois estás de sorte, xa que unha das cinco axencias con sede en España atópase xusto en Vigo: a Axencia Europea de Control da Pesca (EFCA)." />
        </p>
        <p className="mb-6">
          <FormattedMessage defaultMessage="Xa sexas experto en axencias ou che acabes de decatar de que existen, non hai mellor maneira de entendelas que visitando unha! A EFCA ofrécenos a oportunidade única e exclusiva de visitar a súa sede, onde nos explicarán en que consiste o seu traballo e o seu día a día, durante unha visita nas súas instalacións." />
        </p>

        <p className="mt-6 mb-2 font-medium"><FormattedMessage defaultMessage="Esperámoste! 🙌" /></p>

        <div className="flex justify-start w-full mb-2">
          <a
            className="w-full md:w-full flex-grow"
            href="https://forms.gle/wnbHvrRqkvhgQN5E6"
          >
            <ButtonComponent className="w-full bg-opacity-30 hover:bg-opacity-100 bg-primary text-white">
              Reserva o teu sitio! 🪑
            </ButtonComponent>
          </a>
        </div>

        <p className="mt-2 mb-2 font-medium"><FormattedMessage defaultMessage="(Obligatoria inscrición previa!)" /></p>

      </BoxComponent >
    </>
  );
}
