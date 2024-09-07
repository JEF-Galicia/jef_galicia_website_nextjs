import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';

import { parseProperties, Post } from '../api/parse-properties';
import { queryDatabase } from '../api/query-database';
import { any } from 'cypress/types/bluebird';
import { NextSeo } from 'next-seo';
import imgTransparenteLogo from '../public/Main_Isotype.png';
import imgRecruitmentSquare from '../public/Promo_Recruitment_Square.png';
import Image from 'next/image';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import logoJef from '../public/Main_Imagetype_Bounded.svg';
import ButtonComponent from '../components/Button';

import imgPaper1 from '../public/Paper_1.png';
import imgPaper2 from '../public/Paper_2.png';
import imgPaper3 from '../public/Paper_3.png';
import Card from '../components/Card';
import BoxComponent from '../components/Box';

type IndexProps = {
  posts: Post[];
  globalData: any;
};

export async function getStaticProps() {
  var posts = [];
  try {
    const database = await queryDatabase();
    posts = parseProperties(database).filter((post) => !post.archived);
  } catch (e) {
    console.error(e);
  }

  // temporal fix - empty the posts array
  //posts = [];

  const globalData = getGlobalData();

  return { props: { posts, globalData }, revalidate: 360 };
}

export default function Index({ posts, globalData }: IndexProps) {
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

        <div aria-label='blog-posts' className="w-full py-12">
          <h2 className="text-2xl lg:text-3xl text-center mb-6">
            <FormattedMessage defaultMessage="Os nosos últimos artigos" />
          </h2>
          <ul className="w-full">
            {posts.map((post) => (
              <li
                key={post.id}
                className="first:rounded-t-lg last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link
                  as={`/blog/${post.id}`}
                  href={`/blog/[id]`}
                  className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      <FormattedDate value={new Date(post.date)} />
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                  {post.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
