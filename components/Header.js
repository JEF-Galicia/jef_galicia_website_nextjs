import Link from 'next/link';
import Image from 'next/image';
import logoJef from '../public/Main_Isotype.svg';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <div className="w-12 h-12 rounded-full block mx-auto mb-4" >
        <Image src={logoJef} ></Image>
      </div>
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}
