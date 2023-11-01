import Link from 'next/link';

import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { admin_directory_v1 } from 'googleapis';
import { useRouter } from 'next/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// A card that displays its children inside of it

export default function Card(props): JSX.Element {
    const classNames = "md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0 py-6 lg:py-10 px-6 lg:px-12 focus:outline-none focus:ring-4 block";
    return (props.href ?
        (
            <Link href={props.href} className={classNames} {...props}>
                {props.children}
            </Link>
        )
        : (
            <div
                className={classNames}
                {...props}
            >
                {props.children}
            </div>
        ));
}


