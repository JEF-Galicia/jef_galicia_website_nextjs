import { useContext, useState } from "react";
import Image from 'next/image';
import logoJef from '../public/Main_Isotype.svg';
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "../utils/context";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const {globalContext} = useContext(GlobalContext);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6 backdrop-blur bg-white dark:bg-black bg-opacity-10 dark:bg-opacity-30 transition border-b border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50">
            <Link href="/" className="flex items-center flex-no-shrink mr-6">
                <div className="h-8 w-8 mr-2">
                    <Image src={logoJef} width={32} height={32} alt="JEF Galicia logo"></Image>
                </div>
                <span className="font-semibold text-xl tracking-tight">{globalContext.name}</span>
            </Link>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded hover:border-opacity-30 hover:border-black dark:hover:border-white" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="h-3 w-3 fill-black dark:fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menú</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={(isOpen ? "block" : "hidden") + " w-full flex-grow lg:flex lg:items-center lg:w-auto"}>
                <div className="text-sm lg:flex-grow lg:flex lg:gap-8">
                    <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary">
                        <span className={router.pathname === "/about" ? "text-primary" : ""}>Sobre nós</span>
                    </Link>
                    <Link href="/about/federation" className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary">
                        <span className={router.pathname === "/about/federation" ? "text-primary" : ""}>Sobre JEF</span>
                    </Link>
                    <Link href="/about/what_we_do" className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary">
                        <span className={router.pathname === "/about/what_we_do" ? "text-primary" : ""}>Que facemos</span>
                    </Link>
                    <Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary">
                        <span className={router.pathname === "/contact" ? "text-primary" : ""}>Contacto</span>
                    </Link>
                    <Link href="/events/fishing" className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary">
                        <span className={router.pathname === "/events/fishing" ? "text-primary" : ""}>Evento Pesca</span>
                    </Link>
                </div>
                <div>
                    <Link href="/join" className="inline-block text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0">
                        Inscribirme
                    </Link>
                </div>
            </div>
        </nav>
    );
}