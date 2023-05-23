import { NextSeo } from "next-seo";
import BoxComponent from "../components/Box";

export default function Contact() {
    return (
        <>
            <NextSeo
                title="Política de privacidad"
                description="Política de privacidad de JEF Galicia"
            />
            <BoxComponent>
                <h1 className='text-3xl font-semibold mb-6'>Política de privacidad</h1>
                <p>El sitio web jef.gal es propiedad de JEF Galicia, que es un controlador de datos de tus datos personales.</p>
                <p>Hemos adoptado esta Política de privacidad, que determina cómo procesamos la información recopilada por jef.gal, que también proporciona las razones por las que debemos recopilar ciertos datos personales sobre ti. Por lo tanto, debes leer esta Política de privacidad antes de usar el sitio web de jef.gal.</p>
                <p>Cuidamos tus datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.</p>
                <h2 className="text-xl font-semibold mt-4">Información personal que recopilamos:</h2>
                <p>Cuando visitas jef.gal, recopilamos automáticamente cierta información sobre tu dispositivo, incluida información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en tu dispositivo. Además, a medida que navegas, recopilamos información sobre las páginas web individuales o los productos que ves, qué sitios web o términos de búsqueda te remitieron a la web y cómo interactúas. Nos referimos a esta información recopilada automáticamente como &quot;Información del dispositivo&quot;. Además, podemos recopilar los datos personales que nos proporcionas (incluidos, entre otros, nombre, apellido, dirección, información de pago, etc.) durante el registro para poder cumplir con el acuerdo.</p>
                <h2 className="text-xl font-semibold mt-4">¿Por qué procesamos tus datos?</h2>
                <p>Nuestra máxima prioridad es la seguridad de los datos del cliente y, como tal, podemos procesar solo los datos mínimos del usuario, solo en la medida en que sea absolutamente necesario para mantener el sitio web. La información recopilada automáticamente se utiliza solo para identificar casos potenciales de abuso y establecer información estadística sobre el uso del sitio web. Esta información estadística no se agrega de tal manera que identifique a ningún usuario en particular del sistema.</p>
                <p>Puedes visitar la web sin decirnos quién eres ni revelar ninguna información por la cual alguien pueda identificarte como una persona específica. Sin embargo, si deseas utilizar algunas de las funciones del sitio web, o deseas recibir nuestro boletín informativo o proporcionar otros detalles al completar un formulario, puedes proporcionarnos datos personales, como tu correo electrónico, nombre, apellido, ciudad de residencia, organización y número de teléfono. Puedes optar por no proporcionar tus datos personales, pero es posible que no puedas aprovechar algunas de las funciones del sitio web. Por ejemplo, no podrás recibir nuestro boletín ni contactarnos directamente desde el sitio web. Los usuarios que no estén seguros de qué información es obligatoria pueden ponerse en contacto con nosotros a través de contact@jef.gal.</p>
                <h2 className="text-xl font-semibold mt-4">Tus derechos:</h2>
                <p>Si eres residente europeo, tienes los siguientes derechos relacionados con tus datos personales:</p>
                <ol className="pl-8" type="1">
                    <li>1.	El derecho a ser informado.</li>
                    <li>2.	El derecho de acceso.</li>
                    <li>3.	El derecho a la rectificación.</li>
                    <li>4.	El derecho a borrar.</li>
                    <li>5.	El derecho a restringir el procesamiento.</li>
                    <li>6.	El derecho a la portabilidad de datos.</li>
                    <li>7.	El derecho a oponerte.</li>
                    <li>8.	Derechos en relación con la toma de decisiones automatizada y la elaboración de perfiles.</li>
                </ol>
                <p>Si deseas ejercer este derecho, comunícate con nosotros a través de la información de contacto a continuación.</p>
                <p>Además, si eres residente europeo, destacamos que estamos procesando tu información para cumplir con los contratos que podríamos tener contigo, o de otra manera para seguir nuestros intereses legítimos enumerados anteriormente. Además, ten en cuenta que tu información puede transferirse fuera de Europa, incluidos Canadá y Estados Unidos.</p>
                <h2 className="text-xl font-semibold mt-4">Enlaces a otros sitios web:</h2>
                <p>Nuestra web puede contener enlaces a otros sitios web que no son de nuestra propiedad ni están controlados por nosotros. Ten en cuenta que no somos responsables de dichos sitios web ni de las prácticas de privacidad de terceros. Te recomendamos que estés atento cuando abandones nuestro sitio web y leas las declaraciones de privacidad de cada web que pueda recopilar información personal.</p>
                <h2 className="text-xl font-semibold mt-4">Seguridad de la información:</h2>
                <p>Aseguramos la información que proporcionas en servidores informáticos en un entorno controlado y seguro, protegido del acceso, uso o divulgación no autorizados. Mantenemos medidas de seguridad administrativas, técnicas y físicas razonables para proteger contra el acceso no autorizado, el uso, la modificación y la divulgación de datos personales bajo su control y custodia. Sin embargo, no se puede garantizar la transmisión de datos a través de Internet o redes inalámbricas.</p>
                <h2 className="text-xl font-semibold mt-4">Divulgación legal:</h2>
                <p>Divulgaremos cualquier información que recopilemos, usemos o recibamos si así lo requiere o lo permite la ley, como para cumplir con una citación o un proceso legal similar, y cuando creemos de buena fe que la divulgación es necesaria para proteger nuestros derechos, proteger tu seguridad o la seguridad de los demás, investigar el fraude o responder a una solicitud del gobierno.</p>
                <h2 className="text-xl font-semibold mt-4">Información de contacto:</h2>
                <p>Si deseas comunicarte con nosotros para comprender más sobre esta Política o deseas comunicarte con nosotros en relación con cualquier asunto sobre los derechos individuales y tu información personal, puedes enviarnos un correo electrónico a contact@jef.gal.</p>
            </BoxComponent>
        </>
    )
}