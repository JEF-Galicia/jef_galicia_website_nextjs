
import '@9gustin/react-notion-render/dist/index.css';
import { admin_directory_v1 } from 'googleapis';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { GoogleDirectory } from '../../../api/client';
import BoxComponent from '../../../components/Box';
import ButtonComponent from '../../../components/Button';
import MemberCard from '../../../components/MemberCard';

export async function getStaticPaths() {
    const emails = await GoogleDirectory.groups.list({
        domain: 'teams.jef.gal',
    }).then((res) => {
        return res.data.groups.map((g) => ({ params: { email: g.email } }));
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
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const group = await GoogleDirectory.groups.get({
        groupKey: context.params.email,
    }).then((res) => {
        return res.data;
    });

    // get all the memberships of the user
    const memberships = await GoogleDirectory.members.list({
        groupKey: context.params.email,
        includeDerivedMembership: true,
    }).then((res) => res.data).catch(() => ({
        members: []
        }));

    const photos = await Promise.all(memberships.members?.map((memb) =>
        GoogleDirectory.users.photos.get({
            userKey: memb.email,
        }).then((res) => {
            return res.data;
        }).catch((e) => {
            return null;
        })
    )).catch(() => ([]));

    const users = await Promise.all(memberships?.members?.filter(m => m.type === 'USER').map((memb) =>
        GoogleDirectory.users.get({
            userKey: memb.email,
        }).then((res) => {
            return res.data;
        }).catch((e) => {
            console.error(memb);
            return null;
        })
    )).catch(() => ([]));

    return { props: { group, memberships, photos, users }, revalidate: 3600 }; // revalidate every hour
}

export default function MemberPage({ group, memberships, photos, users }: { group: admin_directory_v1.Schema$Group, memberships: admin_directory_v1.Schema$Members, photos: admin_directory_v1.Schema$UserPhoto[], users: admin_directory_v1.Schema$User[] }) {
    const router = useRouter();

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <NextSeo
                title={group.name}
                description={group.description}
            />
            <BoxComponent>
                <h1 className="text-3xl md:text-3xl font-semibold mb-2">
                    {group.name}
                </h1>
                <h2 className="text-xl md:text-xl font-semibold mb-4 opacity-60">
                    <FormattedMessage defaultMessage="Equipo" />
                </h2>
                <p className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
                    {group.description}
                </p>
                {group.email && (<div className="flex justify-start w-full mb-6">
                    <a
                        className="w-full md:w-full flex-grow"
                        href={"mailto:" + group.email}
                    >
                        <ButtonComponent className="w-full bg-opacity-30 hover:bg-opacity-100 bg-primary text-white">
                            {group.email}
                        </ButtonComponent>
                    </a>
                </div>)}
                {memberships.members?.length > 0 &&
                    <div>
                        <h2 className='text-2xl font-semibold mb-2'><FormattedMessage defaultMessage="Persoas integrantes" /></h2>
                        <ul>
                            {memberships.members?.map(memb => {
                                const user = users.find((u) => u && u.primaryEmail === memb.email);
                                return (user ?
                                    <li
                                        key={memb.email}
                                        className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
                                        onClick={(e) => {
                                            router.push('/about/members/' + memb.email);
                                        }}
                                    >
                                        <MemberCard
                                            photo={photos.find((p) => p && p.primaryEmail === memb.email)}
                                            user={user}
                                        ></MemberCard>
                                    </li>
                                    : <></>)
                            }
                            )}
                        </ul>
                    </div>
                }
            </BoxComponent >
        </>
    );
}

