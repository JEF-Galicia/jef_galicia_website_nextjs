import { NextSeo } from "next-seo";
import BoxComponent from "../../components/Box";
import Image from "next/image";
import image1 from '../../public/Congress_EU_Year_Youth.jpg';
import image2 from '../../public/Speaking_In_Library.jpg';
import image3 from '../../public/Italy_Congress.jpg';
import image4 from '../../public/EU_Handshake.jpg';
import Link from "next/link";
import { FormattedMessage } from "react-intl";

export default function WhatWeDo() {
    return (
        <>
            <NextSeo
                title="Que facemos"
                description="As actividades e iniciativas de JEF Galicia"
            />
            <BoxComponent>
                <h1 className='text-3xl font-semibold my-6'><FormattedMessage defaultMessage="Que facemos"/></h1>
                <div className="h-22 flex mx-0 mb-4 flex-col place-items-center rounded">
                    <Image src={image1} alt="Congreso do EU Year Of Youth" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2"><FormattedMessage defaultMessage="Actividades"/></h3>
                <p className="mb-6"><FormattedMessage defaultMessage="A nosa asociación organiza eventos e actividades para os nosos membros e para o público en xeral. Estas actividades poden ser de todo tipo, dende eventos de networking e actividades de grupo, ata viaxes e visitas a institucións e eventos europeos."/></p>
                <div className="h-22 flex mx-0 mt-10 mb-4 flex-col place-items-center rounded">
                    <Image src={image2} alt="Persoas mozas falando nunha biblioteca" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2"><FormattedMessage defaultMessage="Iniciativas"/></h3>
                <p className="mb-6">
                    <FormattedMessage defaultMessage="A nosa asociación tamén leva a cabo iniciativas para promover a participación dos mozos e mozas na política europea. Estas iniciativas abranguen desde campañas de sensibilización, ata actividades de voluntariado."/></p>
                <div className="h-22 flex mx-0 mt-10 mb-4 flex-col place-items-center rounded">
                    <Image src={image3} alt="Muller falando nun congreso en Italia" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2"><FormattedMessage defaultMessage="Congresos"/></h3>
                <p className="mb-6">
                    <FormattedMessage defaultMessage="JEF Galicia organiza asimesmo congresos, conferencias e eventos de maior envergadura, nos que se debaten temas de interese para a cidadanía europea. Estes congresos poden ser tanto en formato presencial, como en formato online."/></p>
                <div className="h-22 flex mx-0 mt-10 mb-4 flex-col place-items-center rounded">
                    <Image src={image4} alt="Moza xove dando a man a unha política" className="rounded" />
                </div>
                <h3 className="text-2xl font-semibold mt-6 mb-2"><FormattedMessage defaultMessage="Proxectos"/></h3>
                <p className="mb-6">
                    <FormattedMessage defaultMessage="A nosa asociación tamén leva a cabo proxectos de maior duración, que poden abranguer desde unha semana, ata varios meses. Por exemplo, "/><Link href='/projects/bench_for_europe'>Banco por Europa</Link><FormattedMessage defaultMessage=" é un proxecto que consiste en pintar bancos coa bandeira da Unión Europea, para promover a sensibilización sobre a Unión Europea." /></p>
            </BoxComponent>
        </>
    )
}
