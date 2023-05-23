import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import imagenEvento from '../../public/ImagenPesca.png';

export default function Fishing() {
  return (
    <>
      <NextSeo
        title="O sector pesqueiro galego ante a restrición da pesca de fondo"
        description="Información e métodos de contacto cos nosos membros"
      />
      <BoxComponent>
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">
          O sector pesqueiro galego ante a restrición da pesca de fondo
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
        <p className='mb-6'><span className="font-semibold">Onde:</span> <br/>
          Salón de Actos, Escola Técnica Superior de Enxeñaría <br/>
          Rúa de Lope Gómez de Marzoa, S/N <br/>
          Campus Vida, Universidade de Santiago de Compostela <br/>
          15705 Santiago de Compostela <br />
          <a href="https://goo.gl/maps/vBw1zKRBJreEp8b98" className="opacity-60">📍Tes aquí a direción do Google Maps</a>
        </p>
        <p className="mb-6">Esperámoste! 🙌</p>
        
        <div className="flex justify-center">
          <a
            href="https://www.eventbrite.es/e/el-sector-pesquero-gallego-ante-la-restriccion-de-la-pesca-de-fondo-tickets-620268839797"
            className="w-auto font-semibold text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4"
          >
            {'Reserva o teu sitio! 🪑'}
          </a>
        </div>
      </BoxComponent>
    </>
  );
}