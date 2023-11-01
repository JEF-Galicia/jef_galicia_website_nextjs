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
import { Map, Marker } from "pigeon-maps";

type IndexProps = {
    //users: UserObjectResponse[];
    users: admin_directory_v1.Schema$User[];
    photos: admin_directory_v1.Schema$UserPhoto[];
    groups: admin_directory_v1.Schema$Groups;
    memberships: { [x: string]: admin_directory_v1.Schema$Members };
    places: { [x: string]: { places: { location: { latitude: number, longitude: number } }[] } };
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

        const places = await Promise.all(users.map(u => u.addresses?.find(a => a.type === 'work')?.formatted)
            .filter(a => a)
            .reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
            .map(async (address) => {
                // Get the coordinates of the address
                const addressInformation = await fetch('https://places.googleapis.com/v1/places:searchText', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
                        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location',
                    },
                    body: JSON.stringify({
                        textQuery: address,
                        languageCode: 'en',
                    }),
                }).then((res) => {
                    return (res.json());
                });

                return ({
                    [address]: addressInformation,
                });

            })).then((res) => {
                return res.reduce((acc, place) => {
                    return { ...acc, ...place }; // Merge all the objects into one
                }
                    , {});
            }
            );

        return { props: { users, photos, groups, memberships, places }, revalidate: 3600 }; // revalidate every hour
    } catch (e) {
        console.error(e);
        return { props: { users: [], photos: [], groups: [], memberships: [], places: [] } };
    }
}

export default function Index({ users, photos, memberships, groups, places }: IndexProps) {
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
            <div className='mt-8'>
                <Map height={500} defaultZoom={4} boxClassname='' attribution={false} defaultCenter={[50.0, 5.0]}>
                    {usersWithAddressesOrdered.map((user) => {
                        const tagline = (user.addresses as [{ type: string, formatted: string }])?.find(a => a.type === 'work')?.formatted;
                        return (
                            <Marker key={user.id} width={50} anchor={[places[tagline]?.places[0].location?.latitude, places[tagline]?.places[0].location?.longitude]} >
                                <svg width={40} height={50} viewBox="0 0 61 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g style={{ pointerEvents: 'auto' }}>
                                        <path
                                            d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z"
                                            fill={"var(--color-primary)"}
                                            stroke="white"
                                            strokeWidth="4"
                                        />
                                        <circle cx="30.5" cy="30.5" r="8.5" fill="white" opacity={0.6} />
                                    </g>
                                </svg>
                            </Marker>
                        )
                    })}
                </Map>
            </div>
            <ul className="w-full mt-8">
                {usersWithAddressesOrdered.map((user) => {
                    const tagline = (user.addresses as [{ type: string, formatted: string }])?.find(a => a.type === 'work')?.formatted;
                    return (
                        <Card key={user.id} href={'/about/members/' + user.primaryEmail}>
                            <h2>
                                {user.name.fullName}
                            </h2>
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>
                                {tagline}
                            </p>
                        </Card>
                    )
                })}
            </ul>
        </BoxComponent>
    );
}

