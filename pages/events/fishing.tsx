import { NextSeo } from 'next-seo';
import BoxComponent from '../../components/Box';
import Image from 'next/image';
import imagenEvento from '../../public/ImagenPesca2.png';
import EUCofundedLogo from '../../public/Cofunded_EU_Logo.png';
import JEFEuropeLogo from '../../public/JEF_EU_Logo.png';
import JEFGalLogo from '../../public/Main_Imagetype.svg';
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
        <div className="grid grid-cols-3 gap-12 px-4 md:px-16 pb-6 items-center">
          <Image src={EUCofundedLogo} alt="Co-funded by the EU" className="" />
          <Image src={JEFEuropeLogo} alt="JEF Europa" className="" />
          <Image src={JEFGalLogo} alt="JEF Galicia" className="" />
        </div>
        <div className="flex justify-start w-full mb-6">
          <a
            className="w-full md:w-full flex-grow"
            href="https://www.eventbrite.es/e/el-sector-pesquero-gallego-ante-la-restriccion-de-la-pesca-de-fondo-tickets-620268839797"
          >
            <ButtonComponent className="w-full">
              Reserva o teu sitio! 🪑
            </ButtonComponent>
          </a>
        </div>

        <h2 className=''><span className="font-semibold">Cando?</span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className='font-medium'>🗓️ 7 de xullo, 2023</p>
          <p className='font-medium'>⌚ 17:30h - 19:00h</p>
        </div>
        <h2 className=''><span className="font-semibold">Onde?</span></h2>
        <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
          <p className="">
            <span className="font-medium">Sede Afundación</span><br />
            <span className="font-medium">Sala de Prensa</span><br />
            Cantón Grande, 8<br />
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

        <p className="mb-6">
          Descobre a <span className="font-semibold">Actualidade da Política Pesqueira na Unión Europea e Galicia!</span>
        </p>
        <p className="mb-6">
          Exploraremos a gobernanza mariña, a sustentabilidade e a tecnoloxía na pesca. Coñece a historia e as últimas transformacións da Política Pesqueira Común, así como os eventos recentes que reavivaron o debate entre a protección ambiental e a industria pesqueira.
        </p>
        <p className="mb-6">
          Contaremos con <span className="font-semibold">relatores de renome</span>:
        </p>
        <ul className="">
          <li>
            👩‍🦰 Cristina Pichel, directora xeral de Xuventude, Participación e Voluntariado da Xunta de Galicia
          </li>
          <li>
            🗳 Ana Miranda, deputada do BNG no Parlamento Europeo
          </li>
          <li>
            🧰 Fernando González Laxe, ex-presidente da Xunta de Galicia e director do Instituto Universitario de Estudos Marítimos
          </li>
          <li>
            🐠 Martín Fernández, presidente da Autoridade Portuaria da Coruña
          </li>
        </ul>
        <p className="mb-6">
          Ademais, haberá oportunidades para facer preguntas e compartir ideas con outras asistentes.
        </p>

        <p className="mb-6">
          Non perdas a oportunidade de entender a complexa realidade da política pesqueira e o seu impacto na nosa rexión. Rexístrate agora, e forma parte deste diálogo crucial!
        </p >
        <p className="mt-6 mb-2 font-medium">Esperámoste! 🙌</p>

      </BoxComponent >
    </>
  );
}
