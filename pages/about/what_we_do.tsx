import { NextSeo } from "next-seo";
import BoxComponent from "../../components/Box";

export default function WhatWeDo() {
    return (
        <>
            <NextSeo
                title="Que facemos"
                description="As actividades e iniciativas de JEF Galicia"
            />
            <BoxComponent>
                <h1 className='text-3xl font-semibold my-6'>Que facemos</h1>
                <p className='mb-6'>A nosa labor concretízase no fomento da participación da xuventude galega na construción dunha Europa máis unida e democrática, a través da organización de actividades e campañas de sensibilización e formación. Ademais, JEF Galicia tamén colabora con outras organizacións e institucións galegas para promover a participación cidadá e o compromiso político entre a xuventude galega.</p>
            </BoxComponent>
        </>
    )
}
