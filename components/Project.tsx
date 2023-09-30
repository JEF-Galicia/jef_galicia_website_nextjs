import Link from 'next/link';
import Image from 'next/image';
import logoJef from '../public/Main_Imagetype_Bounded.svg';
import { useContext } from 'react';
import { GlobalContext } from '../utils/context';
import { NextSeo } from 'next-seo';
import BoxComponent from './Box';
import { props } from 'cypress/types/bluebird';
import ButtonComponent from './Button';

export interface IProjectComponentProps {
    name: string
    description: string
    children: any
    image?: any
    email?: string
}

export default function ProjectComponent(props) {

    return (
        <>
            <NextSeo
                title={props.name}
                description={props.description}
            />
            <BoxComponent>
                <h1 className="text-3xl md:text-5xl font-semibold mb-8">
                    {props.name}
                </h1>
                {props.image &&
                (<div className="h-22 flex mx-0 mb-4 flex-col place-items-center rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-b p-0 focus:outline-none focus:ring-4">
                    {props.image}
                </div>)
                }
                <p className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 mb-6 mt-3">
                    {props.description}
                </p>
        {props.email && (<div className="flex justify-start w-full mb-6">
          <a
            className="w-full md:w-full flex-grow"
            href={"mailto:" + props.email}
          >
            <ButtonComponent className="w-full bg-opacity-30 hover:bg-opacity-100 bg-primary text-white">
              {props.email}
            </ButtonComponent>
          </a>
        </div>)}
                {props.children}
            </BoxComponent>
        </>
    );
}
