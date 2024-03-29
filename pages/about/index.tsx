import Link from 'next/link';

import Footer from '../../components/Footer';
import Layout, { GradientBackground } from '../../components/Layout';
import ArrowIcon from '../../components/ArrowIcon';
import { getGlobalData } from '../../utils/global-data';

import { parseProperties } from '../../api/parse-properties';
import { getAllUsers, queryDatabase } from '../../api/query-database';
import { any } from 'cypress/types/bluebird';
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../utils/context';
import { NextSeo } from 'next-seo';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { GoogleDirectory } from '../../api/client';
import { admin_directory_v1 } from 'googleapis';
import { useRouter } from 'next/router';
import MemberCard from '../../components/MemberCard';
import ButtonComponent from '../../components/Button';
import BoxComponent from '../../components/Box';

type IndexProps = {
  //users: UserObjectResponse[];
  users: admin_directory_v1.Schema$User[];
  photos: admin_directory_v1.Schema$UserPhoto[];
  groups: admin_directory_v1.Schema$Groups;
  memberships: { [x: string]: admin_directory_v1.Schema$Members };
};

export async function getStaticProps() {
  //var users = [];
  //try {
  //  users = (await getAllUsers()).results.filter(
  //    (user) => user.type === 'person'
  //  );
  //} catch (e) {
  //  console.error(e);
  //}
  try {

    await GoogleDirectory.groups.list({
      domain: 'jef.gal'
    }).then((res) => {
      return res.data.groups;
    });

    const users = await GoogleDirectory.users.list({
      domain: 'jef.gal',
      orderBy: 'GIVEN_NAME',
      showDeleted: 'false',
      //viewType: 'domain_public',
    }).then((res) => {
      return res.data.users;
    }
    );

    const photos = await Promise.all(users.map((u) =>
      GoogleDirectory.users.photos.get({
        userKey: u.primaryEmail,
      }).then((res) => {
        return res.data;
      }).catch((e) => {
        return null;
      })
    ));

    const groups = await GoogleDirectory.groups.list({
      domain: 'teams.jef.gal',
    }).then((res) => {
      return res.data;
    });

    const memberships = await Promise.all(groups.groups.map(async (g) => ({
      [g.id]: await GoogleDirectory.members.list({
        groupKey: g.email,
        includeDerivedMembership: true,
      }).then((res) => res.data)
    }))).then((res) => {
      return res.reduce((acc, membership) => {
        return { ...acc, ...membership }; // Merge all the objects into one
      }
        , {});
    }
    );
    return { props: { users, photos, groups, memberships }, revalidate: 3600 }; // revalidate every hour
  } catch (e) {
    return { props: { users: [], photos: [], groups: [], memberships: [] } };
  }
}

export default function Index({ users, photos, memberships, groups }: IndexProps) {
  const intl = useIntl();
  const router = useRouter();

  return (
    <BoxComponent>

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
      <p className="text-center mb-6">
        <FormattedMessage defaultMessage="Somos un equipo de persoas activas que traballamos por unha Europa máis unida." />
      </p>
      <p className="text-center mb-4">
        <FormattedMessage defaultMessage="Todas nós somos persoas voluntarias, cunha paixón compartida pola Unión Europea e Galicia. A nosa labor desinteresada busca promover unha sociedade máis aberta, igualitaria, libre, democrática e xusta." />
      </p>
      <Link href='/about/members'>
        <ButtonComponent className='mb-10 w-full'><FormattedMessage defaultMessage="Membros" /></ButtonComponent>
      </Link>

      <p className="text-center mb-4">
        <FormattedMessage defaultMessage="Estamos estruturados en equipos de traballo que se encargan de diferentes áreas, como as nosas relacións públicas e institucionais, diversidade e inclusión, etc." />
      </p>
      <Link href='/about/teams'>
        <ButtonComponent className='mb-10 w-full'><FormattedMessage defaultMessage="Equipos" /></ButtonComponent>
      </Link>

      <p className="text-center mb-4">
        <FormattedMessage defaultMessage="Tamén desenvolvemos proxectos e actividades propias, contando co apoio de diferentes institucións e organizacións." />
      </p>
      <Link href='/projects'>
        <ButtonComponent className='w-full'><FormattedMessage defaultMessage="Proxectos" /></ButtonComponent>
      </Link>
    </BoxComponent>
  );
}
