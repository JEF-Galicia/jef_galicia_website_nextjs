import BoxComponent from "../../components/Box";

export default function Federation() {
    return (
        <BoxComponent>
            <h1 className='text-3xl font-semibold my-6'>A Federación JEF</h1>
            <p className='mb-6'>A Federación das Xuventudes Europeas Federalistas (JEF, polas súas siglas en francés) é unha organización política que ten como obxectivo fomentar a participación e o compromiso da xuventude europea na construción dunha <span className="font-semibold">Europa máis unida e democrática</span>. A nosa visión é a dunha Europa federal, onde as decisións se tomen en común e de forma democrática, respectando a diversidade cultural e lingüística de todos os seus pobos.</p>

            <p className='mb-6'>JEF é unha organización non gobernamental que ten a súa sede en Bruxelas, Bélxica, e conta con seccións nacionais en diferentes países europeos, incluíndo España. Igualmente, cada país conta con seccións rexionais, como é o caso de JEF Galicia. En conxunto, a nosa acción consiste en organizar actividades e campañas que promovan o debate e a reflexión sobre temas de interese europeo, así como a formación de novos líderes e lideresas comprometidos coa construción dunha Europa máis unida.</p>

            <p className='mb-6'>No caso de JEF Galicia, a nosa labor concretízase no fomento da participación da xuventude galega na construción dunha Europa máis unida e democrática, a través da organización de actividades e campañas de sensibilización e formación. Ademais, JEF Galicia tamén colabora con outras organizacións e institucións galegas para promover a participación cidadá e o compromiso político entre a xuventude galega.</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 mb-6">
                <a href="https://jef.eu" className='inline-block text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0'>{'Web de JEF Europa'}</a>
                <a href="https://jefspain.org" className='inline-block text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0'>{'Web de JEF España'}</a>
            </div>
        </BoxComponent>
    )
}