import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import imagenEvento from '../../public/ImagenPesca.png';
import ButtonComponent from '../../components/Button';

export default function Fishing() {
  return (
    <>
      <NextSeo
        title="A Actualidade da Política Pesqueira na Unión Europea e Galicia"
        description="Información e métodos de contacto cos nosos membros"
      />
      <BoxComponent>
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">
          A Actualidade da Política Pesqueira na Unión Europea e Galicia
        </h1>
        <div className="h-22 flex mx-0 mb-4 flex-col place-items-center rounded">
          <Image src={imagenEvento} alt="Imaxe do evento" className="rounded" />
        </div>
        <p className="mb-6">
          Neste evento presentaremos a nova asociación JEF Galicia, ó mesmo
          tempo que debatiremos as últimas noticias sobre <span className="font-semibold">a política pesqueira
            común</span>, co obxectivo de achegar máis as políticas da Unión Europea á
          cidadanía galega.
        </p>
        <p className="mb-6">
          O evento incluirá breves presentacións, un panel de debate e unha
          actividade de grupo.
        </p>
        <p className="mb-6">
          Se queres saber máis sobre este evento, podes contactarnos a través das nosas redes
          sociais, ou enviando un mail a{' '}
          <a href="mailto:evento.pesca@jef.gal" className="opacity-60">
            evento.pesca@jef.gal
          </a>
          .
        </p>
        <h2 className=''><span className="font-semibold">Cando?</span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
        <p className='font-medium'>🗓️ 7 de xullo, 2023</p>
        <p className='font-medium'>⌚ 17:30h - 19:00h</p>
        </div>
        <h2 className=''><span className="font-semibold">Onde?</span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className="">
            <span className="font-medium">Autoridade Portuaria de A Coruña</span><br />
              Avenida da Marina, 3<br />
              15001 A Coruña
          </p>
        <a
          href="https://goo.gl/maps/5yzM2CrMvf4QCnRL6"
        >
          <ButtonComponent className="w-full md:w-auto mt-2 mb-2">
            📍 Tes aquí a direción do Google Maps
          </ButtonComponent>
        </a>
        </div>
        <p className="mt-6 mb-2 font-medium">Esperámoste! 🙌</p>

        <div className="flex justify-start">
          <a
            href="https://www.eventbrite.es/e/el-sector-pesquero-gallego-ante-la-restriccion-de-la-pesca-de-fondo-tickets-620268839797"
          >
            <ButtonComponent className="w-full md:w-auto">
              Reserva o teu sitio! 🪑
            </ButtonComponent>
          </a>
        </div>
      </BoxComponent>
    </>
  );
}
