import { NextSeo } from "next-seo";
import BoxComponent from "../components/Box";

export default function Contact() {
    return (
        <>
            <NextSeo
                title="Contacto"
                description="Información e métodos de contacto cos nosos membros"
            />
            <BoxComponent>
                <h1 className='text-3xl font-semibold mb-6'>Contacta con nós</h1>
                <p className='mb-6'>Se queres contactar con nós, podes facelo a través das nosas redes sociais, ou enviando un mail a <a href="mailto:contact@jef.gal" className=" opacity-60">contact@jef.gal</a>.</p>
                <p>Se prefires vernos en persoa, a nosa direción é:</p>
                <div className="w-full md:rounded-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-0 bg-opacity-0 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b py-4 lg:py-6 px-4 lg:px-10 block focus:outline-none focus:ring-4 my-6">
                    <p className="">
                        <span className="font-medium">Asociación JEF Galicia</span><br />Escola Técnica Superior de Enxeñaría<br/>Rúa de Lope Gómez de Marzoa, S/N<br />15705 Santiago de Compostela<br />A Coruña, España
                    </p>
                </div>
                <p>Esperámoste! 🙌</p>
            </BoxComponent>
        </>
    )
}