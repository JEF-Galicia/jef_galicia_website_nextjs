import Link from 'next/link';

import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { admin_directory_v1 } from 'googleapis';
import { useRouter } from 'next/router';

type MemberCardProps = {
    //users: UserObjectResponse[];
    user: admin_directory_v1.Schema$User;
    photo: admin_directory_v1.Schema$UserPhoto;
};

export default function MemberCard({ user, photo }: MemberCardProps) {
    const intl = useIntl();
    const router = useRouter();

    return (
        <div className="py-6 lg:py-10 px-6 lg:px-12 focus:outline-none focus:ring-4 block md:flex gap-8 items-center cursor-pointer"
            onClick={(e) => {
                router.push('/about/members/' + user.primaryEmail);
            }}
        >
            <div className="mb-4 md:mb-0 md:basis-1/6 md:text-right">
                {photo && (
                    <Image
                        src={'data:' + photo.mimeType + ';base64,' + photo.photoData.replace(/_/g, '/').replace(/-/g, '+')}
                        alt="avatar"
                        width={photo.width}
                        height={photo.height}
                        className="rounded inline-block"
                    ></Image>
                )
                }
            </div>
            <div className="grow">
                <h2>{user.name.fullName}</h2>
                {user.emails && (
                    <a
                        href={'mailto:' + user.primaryEmail}
                        className="mt-3 text-lg opacity-60"
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

