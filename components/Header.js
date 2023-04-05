import Link from 'next/link';
import Image from 'next/image';
import logoJef from '../public/Main_Imagetype_Bounded.svg';
import { useContext } from 'react';
import { GlobalContext } from '../utils/context';

export default function Header() {
    const {globalContext} = useContext(GlobalContext);

    return (
        <header className="pb-12">
            <div className="h-22 flex mx-0 mb-4 flex-col place-items-center" >
                <Image src={logoJef} ></Image>
            </div>
            {/*
            <p className="text-2xl dark:text-white text-center">
                {globalContext.name}
            </p>
            */}
        </header>
    );
}
