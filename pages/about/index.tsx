import Link from 'next/link';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import ArrowIcon from '../../components/ArrowIcon';
import { getGlobalData } from '../../utils/global-data';

import { parseProperties } from '../../api/parse-properties';
import { getAllUsers, queryDatabase } from '../../api/query-database';
import { any } from 'cypress/types/bluebird';
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { useContext } from 'react';
import { GlobalContext } from '../../utils/context';
import { NextSeo } from 'next-seo';
import { FormattedMessage, useIntl } from 'react-intl';
import { getGoogleUsers } from '../../api/gcloud';

type IndexProps = {
  users: UserObjectResponse[];
};

export async function getStaticProps() {
  var users = [];
  try {
    users = (await getAllUsers()).results.filter(
      (user) => user.type === 'person'
    );
  } catch (e) {
    console.error(e);
  }

  await getGoogleUsers();

  return { props: { users }, revalidate: 86400 };
}

export default function Index({ users }: IndexProps) {
  const intl = useIntl();
  return (
    <main className="w-full">
      <NextSeo
        title={intl.formatMessage({ defaultMessage: 'Sobre JEF Galicia' })}
        description={intl.formatMessage({
          defaultMessage: 'Información sobre JEF Galicia e os seus membros',
        })}
      />
      {/*<h1 className="text-3xl text-center mb-6 mt-12">
                Sobre a Federación
            </h1>
    <button type="submit" className='inline-block text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0'>{'Inscribirme 💌'}</button>*/}
      <h1 className="text-3xl text-center mb-6">
        <FormattedMessage defaultMessage="Sobre nós" />
      </h1>
      <p className="text-center mb-12">
        <FormattedMessage defaultMessage="Somos un equipo de persoas activas que traballamos por unha Europa máis unida." />
      </p>
      <ul className="w-full">
        {users.map((user) => (
          <li
            key={user.id}
            className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
          >
            <div className="py-6 lg:py-10 px-6 lg:px-16 focus:outline-none focus:ring-4 block md:flex gap-8 items-center">
              <div className="mb-4 md:mb-0 md:basis-1/6 md:text-right">
                {user.avatar_url && (
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    width={64}
                    height={64}
                    className="rounded inline-block"
                  ></Image>
                )}
              </div>
              <div className="grow">
                <h2>{user.name}</h2>
                {user['person'] && user['person']['email'] && (
                  <a
                    href={'mailto:' + user['person']['email']}
                    className="mt-3 text-lg opacity-60"
                  >
                    {user['person']['email']}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
