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
            'Somos unha asociación sen ánimo de lucro adicada ao fomento da participación da xuventude galega na construción dunha Europa federal, a través da organización de actividades e campañas de sensibilización e formación.',
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
          <FormattedMessage defaultMessage="Somos unha asociación sen ánimo de lucro adicada ao fomento da participación da xuventude galega na construción dunha Europa federal, a través da organización de actividades e campañas de sensibilización e formación." />
        </p>
      </header>
      <main className="w-full px-8">
        <div aria-label='about-us' className="w-full py-12">
          <h2 className="text-2xl lg:text-3xl text-center mb-6">
            <FormattedMessage defaultMessage="Coñécenos" />
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
        <div aria-label='blog-posts' className="w-full py-12">
          <h2 className="text-2xl lg:text-3xl text-center mb-6">
            <FormattedMessage defaultMessage="Os nosos últimos artigos" />
          </h2>
          <ul className="w-full">
            {posts.map((post) => (
              <li
                key={post.id}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
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
