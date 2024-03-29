import Link from 'next/link';

import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { admin_directory_v1 } from 'googleapis';
import { useRouter } from 'next/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MemberCardProps = {
    //users: UserObjectResponse[];
    user: admin_directory_v1.Schema$User;
    photo: admin_directory_v1.Schema$UserPhoto;
    tagline?: string;
};

export default function MemberCard({ user, photo, tagline }: MemberCardProps) {
    const intl = useIntl();
    const router = useRouter();

    return (
        <div className="py-6 lg:py-10 px-6 lg:px-12 focus:outline-none focus:ring-4 block md:flex gap-8 items-center cursor-pointer"
            onClick={(e) => {
                router.push('/about/members/' + user.primaryEmail);
            }}
        >
            <div className="mb-4 md:mb-0 md:basis-1/6 md:text-right shrink-0">
                {photo ? (
                    <Image
                        src={'data:' + photo.mimeType + ';base64,' + photo.photoData.replace(/_/g, '/').replace(/-/g, '+')}
                        alt="avatar"
                        width={photo.width}
                        height={photo.height}
                        className="rounded inline-block"
                    ></Image>
                ) : (
                    // Generic icon of a person from Font Awesome
                    <div className='bg-white dark:bg-gray-500 w-24 h-24 rounded flex items-center justify-center'>
                    <FontAwesomeIcon icon={faUser} size="3x" className="rounded opacity-70 py-auto"></FontAwesomeIcon>
                    </div>
                )
                }
            </div>
            <div className="grow">
                <h2 className='font-semibold'>{user.name.fullName}</h2>
                {tagline && (
                    <p className=" text-base opacity-60 m-0 mt-2">{tagline}</p>
                )}
                {user.emails && (
                    <a
                        href={'mailto:' + user.primaryEmail}
                        className="text-base opacity-60"
                    >
                        {user.primaryEmail}
                    </a>
                )}
                {user.orgUnitPath === '/Junta Directiva' && (
                    //  <p>Integrante da Xunta Directiva</p>
                    <></>
                )}
                {user.creationTime && (
                    //<p>Data de unión: <FormattedDate value={user.creationTime}></FormattedDate></p>
                    <></>
                )}
            </div>
        </div>
    );
}

