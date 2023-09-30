import Link from 'next/link';

import '@9gustin/react-notion-render/dist/index.css';
import { admin_directory_v1 } from 'googleapis';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { GoogleDirectory } from '../../../api/client';
import BoxComponent from '../../../components/Box';
import ButtonComponent from '../../../components/Button';

export async function getStaticPaths() {
    const emails = await GoogleDirectory.users.list({
        domain: 'jef.gal',
        showDeleted: 'false',
    }).then((res) => {
        return res.data.users.map((user) => ({ params: { email: user.primaryEmail } }));
    });

    // add gl, es, en
    const localizedRoutes = emails.map((email) => {
        return [
            { params: { email: email.params.email } },
            { params: { email: email.params.email }, locale: 'gl' },
            { params: { email: email.params.email }, locale: 'es' },
            { params: { email: email.params.email }, locale: 'en' },
        ];
    }).flat();

    return {
        paths: localizedRoutes,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const user = await GoogleDirectory.users.get({
        userKey: context.params.email,
        projection: 'full',
    }).then((res) => {
        return res.data;
    });

    const groups = await GoogleDirectory.groups.list({
        domain: 'jef.gal',
        userKey: context.params.email,
    }).then((res) => {
        return res.data.groups ?? [];
    });

    const projects = await GoogleDirectory.groups.list({
        domain: 'projects.jef.gal',
        userKey: context.params.email,
    }).then((res) => {
        return res.data.groups ?? [];
    });

    // get all the memberships of the user
    const projectMemberships = await Promise.all(projects.map((project) => {
        return GoogleDirectory.members.get({
            groupKey: project.email,
            memberKey: context.params.email,
        }).then((res) => {
            return ({
                [project.email]: res.data // Generates a list of objects with the project email as key
            });
        });
    })).then(membrshipsList => {
        return membrshipsList.reduce((acc, membership) => {
            return { ...acc, ...membership }; // Merge all the objects into one
        }, {});
    });

    const teams = await GoogleDirectory.groups.list({
        domain: 'teams.jef.gal',
        userKey: context.params.email,
    }).then((res) => {
        return res.data.groups ?? [];
    });

    const photo = await GoogleDirectory.users.photos.get({
        userKey: context.params.email,
    }).then((res) => {
        return res.data;
    }).catch((e) => {
        return null;
    });

    return { props: { user, groups, photo, projects, teams, projectMemberships }, revalidate: 14400 }; // revalidate every 4 hours
}

export default function MemberPage({ user, groups, photo, projects, teams, projectMemberships }: { user: admin_directory_v1.Schema$User, groups: admin_directory_v1.Schema$Group[], photo: admin_directory_v1.Schema$UserPhoto, projects: admin_directory_v1.Schema$Group[], teams: admin_directory_v1.Schema$Group[], projectMemberships: { [key: string]: admin_directory_v1.Schema$Member } }) {
    const router = useRouter();
    const intl = useIntl();

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <main className='w-full'>
            <NextSeo
                title={user.name.fullName}
                description={user.name.fullName + ' ' + intl.formatMessage({ defaultMessage: 'está en JEF Galicia. Atopa nesta páxina a súa información e roles dentro da asociación, así como os seus datos de contacto.' })}
            />
            <BoxComponent>
                <div className='flex flex-col md:flex-row items-center mb-8 gap-8'>
                    {photo &&
                        <Image
                            src={'data:' + photo.mimeType + ';base64,' + photo.photoData.replace(/_/g, '/').replace(/-/g, '+')}
                            alt="avatar"
                            width={photo.width}
                            height={photo.height}
                            className="rounded inline-block"
                        />
                    }
                    <div>
                        <h1 className="text-3xl font-semibold">
                            {user.name.fullName}
                        </h1>
                        {teams.length > 0 && (
                            <ul>
                                {user.orgUnitPath === '/Junta Directiva' && (
                                    <li><FormattedMessage defaultMessage="Integrante da Xunta Directiva" /></li>
                                )}
                                {teams.map(team =>
                                    <li key={team.id}><Link href={'/about/teams/' + team.email} >
                                        {team.name} Manager
                                    </Link>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                {user.customSchemas?.['Website']?.['Introduction'] &&
                    <BoxComponent className="lg:px-6 py-6 lg:py-6 mb-4">
                        <p className='m-0'>{user.customSchemas['Website']['Introduction']}
                        </p>
                    </BoxComponent>
                }
                {user.primaryEmail && (<div className="flex justify-start w-full mb-6">
                    <a
                        className="w-full md:w-full flex-grow"
                        href={"mailto:" + user.primaryEmail}
                    >
                        <ButtonComponent className="w-full bg-opacity-30 hover:bg-opacity-100 bg-primary text-white">
                            {user.primaryEmail}
                        </ButtonComponent>
                    </a>
                </div>)}
                <dl className='mb-8'>
                    <dt className='font-semibold float-left mr-4'><FormattedMessage defaultMessage="Data de unión" /></dt>
                    <dd><FormattedDate value={user.creationTime} /></dd>
                    <dt className='font-semibold float-left mr-4'><FormattedMessage defaultMessage="Linguas de uso" /></dt>
                    <dd>
                        {user.languages ? user.languages.map(l => (l.languageCode as string).toUpperCase()).join(', ') : 'Ningunha'}
                    </dd>
                </dl>
                {projects.length > 0 &&
                    <BoxComponent className="lg:px-6">
                        <h2 className='text-2xl font-semibold mb-2'><FormattedMessage defaultMessage="Proxectos" /></h2>
                        <dl className='gap-4'>
                            {projects.map(proj =>
                                <div key={proj.id}>
                                    <dt className='font-semibold float-left mr-4'>{proj.name}</dt>
                                    <dd>
                                        {projectMemberships[proj.email].role.toLocaleLowerCase()}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </BoxComponent>
                }
            </BoxComponent>
        </main>
    );
}
