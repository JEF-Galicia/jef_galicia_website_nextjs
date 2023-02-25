import Link from 'next/link';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

import { parseProperties } from '../api/parse-properties';
import { getAllUsers, queryDatabase } from '../api/query-database';
import { any } from 'cypress/types/bluebird';
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { useContext } from 'react';
import { GlobalContext } from '../utils/context';

type IndexProps = {
    users: UserObjectResponse[];
};

export async function getStaticProps() {
    const users = (await getAllUsers()).results.filter((user) => user.type === 'person');

    return { props: { users } };
}

export default function Index({ users }: IndexProps) {
    const [globalData] = useContext(GlobalContext);
    return (
        <Layout>
            <SEO title={globalData.name} description={globalData.blogTitle} />
            <main className="w-full">
                <h1 className="text-3xl text-center mb-12">
                    Sobre nós
                </h1>
                <p className="text-center mb-12">
                    Somos un equipo de persoas activas que traballamos por unha Europa máis unida.
                </p>
                <ul className="w-full">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
                            <div className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                                <h1>
                                    {user.avatar_url && (
                                        <Image src={user.avatar_url} alt="avatar" width={32} height={32} className="rounded inline-block mr-3"></Image>
                                    )}
                                    {user.name}
                                </h1>
                                {
                                    user['person'] && user['person']['email'] && (
                                        <p className="mt-3 text-lg opacity-60">
                                            {user['person']['email']}
                                        </p>
                                    )
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </Layout>
    );

}
