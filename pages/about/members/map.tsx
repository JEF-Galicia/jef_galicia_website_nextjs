import Link from 'next/link';

import { any } from 'cypress/types/bluebird';
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { admin_directory_v1 } from 'googleapis';
import { useRouter } from 'next/router';
import { GoogleDirectory } from '../../../api/client';
import MemberCard from '../../../components/MemberCard';
import BoxComponent from '../../../components/Box';
import Card from '../../../components/Card';

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
    
    const usersWithAddressesOrdered = useMemo(() => {
        return users.map((u) => {
            const tagline = (u.addresses as [{ type: string, formatted: string }])?.find(a => a.type === 'work')?.formatted;
            return {
                ...u,
                tagline,
            }
        }).filter(u => !u.suspended).filter(u => u.tagline).sort((u1, u2) => u1.tagline.localeCompare(u2.tagline));
    }
        , [users]);

    return (
        <BoxComponent>
            <NextSeo
                title={intl.formatMessage({ defaultMessage: 'Sobre JEF Galicia' })}
                description={intl.formatMessage({
                    defaultMessage: 'Información sobre JEF Galicia e os seus membros',
                })}
            />
            <h1 className='text-3xl font-semibold'><FormattedMessage defaultMessage="Mapa de membros" /></h1>
            <p className='mt-4'><FormattedMessage defaultMessage="Aquí tes un mapa coas direccións dos membros de JEF Galicia que teñen proporcionado unha. Se queres saber máis sobre algún deles ou consultar os seus integrantes, só tes que facer click nel." /></p>
            <ul className="w-full mt-8">
                {usersWithAddressesOrdered.map((user) => {
                    const tagline = (user.addresses as [{ type: string, formatted: string }])?.find(a => a.type === 'work')?.formatted;
                    return (
                        <Card key={user.id} href={'/about/members/' + user.primaryEmail}>
                            <h2>
                                {user.name.fullName}
                            </h2>
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>
                                {tagline}</p>
                        </Card>
                    )
                })}
            </ul>
        </BoxComponent>
    );
}

