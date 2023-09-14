import { NextSeo } from "next-seo";
import BoxComponent from "../../components/Box";
import ButtonComponent from "../../components/Button";
import { FormattedMessage } from "react-intl";

export default function Federation() {
    return (
        <>
            <NextSeo
                title="A Federación JEF"
                description="Información sobre a Federación das Xuventudes Europeas Federalistas"
            />
            <BoxComponent>
                <h1 className='text-3xl font-semibold my-6'><FormattedMessage defaultMessage="A Federación JEF"/></h1>
                <p className='mb-6'><FormattedMessage defaultMessage="A Federación das Xuventudes Europeas Federalistas (JEF, polas súas siglas en francés) é unha organización política que ten como obxectivo fomentar a participación e o compromiso da xuventude europea na construción dunha "/><span className='font-semibold'><FormattedMessage defaultMessage="Europa máis unida e democrática" /></span><FormattedMessage defaultMessage=". A nosa visión é a dunha Europa federal, onde as decisións se tomen en común e de forma democrática, respectando a diversidade cultural e lingüística de todos os seus pobos."/></p>

                <p className='mb-6'><FormattedMessage defaultMessage="JEF é unha organización non gobernamental que ten a súa sede en Bruxelas, Bélxica, e conta con seccións nacionais en diferentes países europeos, incluíndo España. Igualmente, cada país conta con seccións rexionais, como é o caso de JEF Galicia. En conxunto, a nosa acción consiste en organizar actividades e campañas que promovan o debate e a reflexión sobre temas de interese europeo, así como a formación de novos líderes e lideresas comprometidos coa construción dunha Europa máis unida."/></p>

                <p className='mb-12'><FormattedMessage defaultMessage="No caso de JEF Galicia, a nosa labor concretízase no fomento da participación da xuventude galega na construción dunha Europa máis unida e democrática, a través da organización de " /><span className='font-semibold'><FormattedMessage defaultMessage="actividades e campañas de sensibilización e formación" /></span><FormattedMessage defaultMessage=". Ademais, JEF Galicia tamén colabora con outras organizacións e institucións galegas para promover a participación cidadá e o compromiso político entre a xuventude galega." /></p>

                <div className="flex flex-col md:flex-col items-center justify-center gap-2 md:gap-6 mb-6">
                    <a href="https://jef.eu">
                        <ButtonComponent>
                            <FormattedMessage defaultMessage="Web de JEF Europa" />
                        </ButtonComponent>
                    </a>
                    <a href="https://jefspain.org">
                        <ButtonComponent>
                            <FormattedMessage defaultMessage="Web de JEF España" />
                        </ButtonComponent>
                    </a>
                    <a href="https://www.jefspain.org/secciones">
                        <ButtonComponent>
                            <FormattedMessage defaultMessage="Outras seccións de JEF España" />
                        </ButtonComponent>
                    </a>
                </div>
            </BoxComponent>
        </>
    )
}