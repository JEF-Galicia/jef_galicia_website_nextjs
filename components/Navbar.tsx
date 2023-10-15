import { useContext, useState } from 'react';
import Image from 'next/image';
import logoJef from '../public/Main_Isotype.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GlobalContext } from '../utils/context';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonComponent from './Button';
import { FormattedMessage } from 'react-intl';
import { admin_directory_v1 } from 'googleapis';

export default function Navbar({teams, projects}: {teams: admin_directory_v1.Schema$Groups, projects: admin_directory_v1.Schema$Groups}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState([]);
  const router = useRouter();
  const { globalContext } = useContext(GlobalContext);

  const showDropdown = (name) => {
    // if the dropdown is closed, open it
    if (!isDropdownOpen.includes(name)) {
      setIsDropdownOpen([...isDropdownOpen, name]);
    }
  };

  const hideDropdown = (name) => {
    // if the dropdown is open, close it
    if (isDropdownOpen.includes(name)) {
      setIsDropdownOpen(isDropdownOpen.filter((item) => item !== name));
    }
  };

  const toggleDropdown = (name) => {
    if (isDropdownOpen.includes(name)) {
      hideDropdown(name);
    } else {
      showDropdown(name);
    }
  };

  const shouldDropdownBeOpen = (name) => {
    return isDropdownOpen.includes(name);
  };

  const { pathname, asPath, query } = router;
  // change just the locale and maintain all other route information including href's query

  const events = {
    aecp_excursion: <FormattedMessage defaultMessage="Excursión AECP" />,
    fishing: <FormattedMessage defaultMessage="Evento Pesca" />,
  };

  return (
    <nav className="sticky z-50 top-0 flex items-center justify-between flex-wrap p-6 backdrop-blur bg-white dark:bg-black bg-opacity-10 dark:bg-opacity-30 transition border-b border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50">
      <Link href="/" className="flex items-center flex-no-shrink mr-6">
        <div className="h-8 w-8 mr-2">
          <Image
            src={logoJef}
            width={32}
            height={32}
            alt="JEF Galicia logo"
          ></Image>
        </div>
        <span className="font-semibold text-xl tracking-tight">
          {globalContext.name}
        </span>
      </Link>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded hover:border-opacity-30 hover:border-black dark:hover:border-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-3 w-3 fill-black dark:fill-white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>
              <FormattedMessage defaultMessage="Menú" />
            </title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          (isOpen ? 'block' : 'hidden') +
          ' w-full flex-grow lg:flex lg:items-center lg:w-auto'
        }
      >
        <div className="text-sm lg:flex-grow lg:flex lg:gap-8 lg:items-center">
          <Link
            href="/about"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary"
          >
            <span
              className={router.pathname === '/about' ? 'text-primary' : ''}
            >
              <FormattedMessage defaultMessage="Sobre nós" />
            </span>
          </Link>
          <Link
            href="/about/federation"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary"
          >
            <span
              className={
                router.pathname === '/about/federation' ? 'text-primary' : ''
              }
            >
              <FormattedMessage defaultMessage="Sobre JEF" />
            </span>
          </Link>
          <Link
            href="/about/what_we_do"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary"
          >
            <span
              className={
                router.pathname === '/about/what_we_do' ? 'text-primary' : ''
              }
            >
              <FormattedMessage defaultMessage="Que facemos" />
            </span>
          </Link>
          <Link
            href="/contact"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary"
          >
            <span
              className={router.pathname === '/contact' ? 'text-primary' : ''}
            >
              <FormattedMessage defaultMessage="Contacto" />
            </span>
          </Link>
          {/* dropdown menu  only on hover */}
          <div
            className="block lg:relative mt-4 lg:inline-block lg:mt-0 text-left"
            onMouseEnter={() => showDropdown('')}
            onMouseLeave={() => hideDropdown('')}
            onClick={() => toggleDropdown('events')}
          >
            <ButtonComponent className="w-full">
              <span className="mr-1">
                <FormattedMessage defaultMessage="Eventos" />
              </span>
              <FontAwesomeIcon
                icon={faArrowDown}
                className="h-5 w-5 align-bottom"
              />
            </ButtonComponent>
            <div
              className={
                (shouldDropdownBeOpen('events') ? 'block' : 'hidden') +
                ' origin-top-right relative lg:absolute left-0 mt-2 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none'
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {Object.keys(events).map((e) => (
                <div className="py-1" role="none" key={e}>
                  <Link
                    href={'/events/' + e}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    role="menuitem"
                  >
                    {events[e]}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* dropdown menu  only on hover */}
          {/*
          <div
            className="block lg:relative mt-4 lg:inline-block lg:mt-0 text-left"
            onMouseEnter={() => showDropdown('')}
            onMouseLeave={() => hideDropdown('')}
            onClick={() => toggleDropdown('projects')}
          >
            <ButtonComponent className="w-full">
              <span className="mr-1">
                <FormattedMessage defaultMessage="Proxectos" />
              </span>
              <FontAwesomeIcon
                icon={faArrowDown}
                className="h-5 w-5 align-bottom"
              />
            </ButtonComponent>
            <div
              className={
                (shouldDropdownBeOpen('projects') ? 'block' : 'hidden') +
                ' origin-top-right relative lg:absolute left-0 mt-2 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none'
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {projects?.groups?.map((p) => (
                <div className="py-1" role="none" key={p.id}>
                  <Link
                    href={'/projects/' + p.email}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    role="menuitem"
                  >
                    {p.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          */}
        </div>
        <div className='text-sm lg:flex-grow-0 lg:flex lg:gap-8 lg:items-center'>
          {/* dropdown menu  only on hover */}
          <div
            className="block lg:relative mt-4 lg:inline-block lg:mt-0 text-left"
            //onMouseEnter={() => showDropdown('locale')}
            //onMouseLeave={() => hideDropdown('locale')}
            onClick={() => toggleDropdown('locale')}
          >
            <ButtonComponent
              className="w-full"
              //onClick={() => toggleDropdown('locale')}
            >
              <span className="mr-1">{router.locale.toUpperCase()}</span>
              <FontAwesomeIcon
                icon={faArrowDown}
                className="h-5 w-5 align-bottom"
              />
            </ButtonComponent>
            <div
              className={
                (shouldDropdownBeOpen('locale') ? 'block' : 'hidden') +
                ' origin-top-right relative lg:absolute left-0 mt-2 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none'
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {['gl', 'es', 'en'].map((locale) => (
                <div className="py-1" role="none" key={locale}>
                  <p
                    onClick={(e) => {
                      router.push({ pathname, query }, asPath, {
                        locale: locale,
                      });
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    role="menuitem"
                  >
                    {locale.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/join"
            className="block lg:relative mt-4 lg:inline-block lg:mt-0"
          >
            <ButtonComponent className="w-full">
              <FormattedMessage defaultMessage="Inscribirme" />
            </ButtonComponent>
          </Link>
        </div>
      </div>
    </nav>
  );
}
