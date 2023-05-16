import { NextSeo } from "next-seo";
import BoxComponent from "../../components/Box";
import Image from "next/image";
import image1 from '../../public/Congress_EU_Year_Youth.jpg';
import image2 from '../../public/Speaking_In_Library.jpg';
import image3 from '../../public/Italy_Congress.jpg';
import image4 from '../../public/EU_Handshake.jpg';

export default function WhatWeDo() {
    return (
        <>
            <NextSeo
                title="Que facemos"
                description="As actividades e iniciativas de JEF Galicia"
            />
            <BoxComponent>
                <h1 className='text-3xl font-semibold my-6'>Que facemos</h1>
                <div className="h-22 flex mx-0 mb-4 flex-col place-items-center rounded">
                    <Image src={image1} alt="Congreso do EU Year Of Youth" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2">Actividades</h3>
                <p className="mb-6">
                    A nosa asociación organiza eventos e actividades para os nosos
                    membros e para o público en xeral. Estas actividades poden ser
                    de todo tipo, desde debates e conferencias, ata eventos de
                    networking e actividades de grupo.
                </p>
                <div className="h-22 flex mx-0 mt-10 mb-4 flex-col place-items-center rounded">
                    <Image src={image2} alt="Persoas mozas falando nunha biblioteca" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2">Iniciativas</h3>
                <p className="mb-6">
                </p>
                <div className="h-22 flex mx-0 mt-10 mb-4 flex-col place-items-center rounded">
                    <Image src={image3} alt="Muller falando nun congreso en Italia" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2">Congresos</h3>
                <p className="mb-6">
                </p>
                <div className="h-22 flex mx-0 mt-10 mb-4 flex-col place-items-center rounded">
                    <Image src={image4} alt="Moza xove dando a man a unha política" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2">Proxectos</h3>
                <p className="mb-6">

                </p>
            </BoxComponent>
        </>
    )
}
