import Link from 'next/link';
import { getGlobalData } from '../utils/global-data';
import { NextSeo } from 'next-seo';
import imgTransparenteLogo from '../public/Main_Isotype.png';
import imgRecruitmentSquare from '../public/Promo_Recruitment_Square.png';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';
import logoJef from '../public/Main_Imagetype_Bounded.svg';
import ButtonComponent from '../components/Button';

import imgPaper1 from '../public/Paper_1.png';
import imgPaper2 from '../public/Paper_2.png';
import imgPaper3 from '../public/Paper_3.png';
import BoxComponent from '../components/Box';

type IndexProps = {
  globalData: any;
};

export async function getStaticProps() {
  // Posts have been removed; only provide global data now.
  const globalData = getGlobalData();
  return { props: { globalData }, revalidate: 360 };
}

export default function Index({ globalData }: IndexProps) {
  const intl = useIntl();
  return (
    <>
      <NextSeo
        title={intl.formatMessage({ defaultMessage: 'Inicio' })}
        description={intl.formatMessage({
          defaultMessage:
            'Somos unha asociación sen ánimo de lucro, políticamente transpartidista e independente, que busca conectar a xuventude galega con Europa a través da organización de actividades e campañas de sensibilización e formación.',
        })}
      />
      <Image src={imgTransparenteLogo} alt="JEF Galicia Logo" className="rounded" style={{ opacity: 0, height: 1, width: 1, position: 'absolute' }} />
      <Image src={imgRecruitmentSquare} alt="JEF Galicia Promo" className="rounded" style={{ opacity: 0, height: 1, width: 1, position: 'absolute' }} />
      <header className="pb-12 w-full px-8">
        <div className="h-22 flex mb-4 flex-col place-items-center mx-0" >
          <Image src={logoJef} alt='JEF Galicia Logo - Xeración Europea Federalista Galicia' ></Image>
        </div>
        <h1 className="text-3xl lg:text-5xl text-center my-12">
          <FormattedMessage defaultMessage="Ola!" />
        </h1>
        <p className="text-xl lg:text-2xl text-center">
          <FormattedMessage defaultMessage="Somos unha asociación sen ánimo de lucro, políticamente transpartidista e independente, que busca conectar a xuventude galega con Europa a través da organización de actividades e campañas de sensibilización e formación." />
        </p>
      </header>
      <main className="w-full px-8">
        <div aria-label='about-us' className="w-full py-12">
          <h2 className="text-2xl lg:text-3xl text-center mb-6">
            <FormattedMessage defaultMessage="Coñécenos 👋" />
          </h2>
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-8 flex-wrap">
            <Link href="/about">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="Quen somos?" />
              </ButtonComponent>
            </Link>
            <Link href="/about/federation">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="Sobre JEF" />
              </ButtonComponent>
            </Link>
            <Link href="/join">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="Inscríbete!" id="sign-up" />
              </ButtonComponent>
            </Link>
          </div>
        </div>

        <BoxComponent className="my-12">
          {/*
            Three images, stacked on top of each other as a stack of paper sheets: Paper_1.png, Paper_2.png, Paper_3.png
            When hovering, the images should spread out a little bit and their drop shadow should decrease.
          */}
          <div className="grid grid-cols-1 w-max-80 group hover:scale-110 transition my-12 mx-8 pb-6 ease-in-out">
            {/* Rotate 3 degrees to the left */}
            <Image className="col-start-1 row-start-1 transform -rotate-6 translate-y-1 z-0 drop-shadow-lg group-hover:rotate-0 group-hover:translate-y-0 group-hover:drop-shadow-none transition ease-in-out" src={imgPaper3} alt="Paper 3" />
            {/* Rotate 3 degrees to the right and translate below */}
            <Image className="col-start-1 row-start-1 transform rotate-6 translate-y-1 z-10 drop-shadow-md group-hover:rotate-0 group-hover:translate-y-0 group-hover:drop-shadow-xl transition ease-in-out" src={imgPaper2} alt="Paper 2" />
            {/* No rotation */}
            <Image className="col-start-1 row-start-1 z-20 drop-shadow-md group-hover:drop-shadow-none transition ease-in-out" src={imgPaper1} alt="Paper 1" />
          </div>
          <h2 className="text-2xl lg:text-3xl text-center mb-6">
            <FormattedMessage defaultMessage="Traballamos para conectar a xuventude galega con Europa 🤝" />
          </h2>
          <p className="text-lg lg:text-xl text-center text-balance">
            <FormattedMessage defaultMessage="Queres saber máis? Consulta o noso paper sobre as nosas perspectivas para o futuro da integración europea 👀" />
          </p>
          <div className="flex justify-center mt-4">
            <Link href="https://doi.org/10.31235/osf.io/r6mva">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="Bótalle un ollo" />
              </ButtonComponent>
            </Link>
          </div>
        </BoxComponent>

        <div aria-label='news-links' className="w-full py-12">
          <h2 className="text-2xl lg:text-3xl text-center mb-6">
            <FormattedMessage defaultMessage="Actualidade e noticias" />
          </h2>
          <p className="text-lg lg:text-xl text-center text-balance">
            <FormattedMessage defaultMessage="Consulta o que di a federación e os nosos socios sobre a actualidade aquí:" />
          </p>
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4 mt-6">
            <a href="https://www.jefspain.org/actualidad" target="_blank" rel="noopener noreferrer">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="JEF España: Actualidad" />
              </ButtonComponent>
            </a>
            <a href="https://jef.eu/about-jef/news/" target="_blank" rel="noopener noreferrer">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="JEF Europe: News" />
              </ButtonComponent>
            </a>
            <a href="https://www.thenewfederalist.eu/" target="_blank" rel="noopener noreferrer">
              <ButtonComponent className="">
                <FormattedMessage defaultMessage="The New Federalist" />
              </ButtonComponent>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
