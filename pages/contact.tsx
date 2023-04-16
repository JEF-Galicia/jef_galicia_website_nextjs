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
            <p>Esperámoste! 🙌</p>
        </BoxComponent>
        </>
    )
}