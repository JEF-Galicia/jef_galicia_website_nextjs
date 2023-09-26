import React, { useRef, useState } from 'react';
import BoxComponent from '../components/Box';
import { NextSeo } from 'next-seo';
import ButtonComponent from '../components/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import logoJef from '../public/Main_Imagetype_Bounded.svg';
import Image from 'next/image';

export default function Subscribe() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await fetch('/api/subscribe_mailing_list', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);

      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = '';
    setMessage('Ben feito! En breve contactaremos contigo 🥰.');
  };

  const intl = useIntl();

  return (
    <>
      <NextSeo
        title={intl.formatMessage({ defaultMessage: 'Inscrición' })}
        description={intl.formatMessage({
          defaultMessage:
            'Forma parte da próxima xeración de europeístas! Inscríbete a JEF Galicia.',
        })}
      />
      <BoxComponent>
        <h1 className="text-3xl font-semibold mb-6">
          <FormattedMessage defaultMessage="Inscríbete!" id="sign-up" />
        </h1>
            <div className="h-22 flex mx-0 mb-4 flex-col place-items-center" >
                <Image alt='JEF Galicia Logo' src={logoJef}/>
            </div>
        <h1 className="text-3xl font-semibold mb-6">
          <FormattedMessage defaultMessage="Quen somos?" />
        </h1>
        <p>
          <FormattedMessage
            defaultMessage="Somos JEF Galicia, unha asociación xuvenil independente e
          sen ánimo de lucro, comprometida coa promoción da integración da Unión
          Europea. Estamos inscritos no Registro de Asociacións da Xunta e formamos parte da
          federación de Young European Federalists (JEF), un movemento con
          máis de 30.000 membros en toda Europa que leva máis de 50 anos
          traballando pola unión do noso continente."
          />
        </p>
        <h1 className="text-3xl font-semibold my-6">
          <FormattedMessage defaultMessage="Por que unirte a nós?" />
        </h1>
        <h2 className="text-xl font-semibold mt-4">
          <FormattedMessage defaultMessage="1. Compromiso coa integración europea" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Uníndote a JEF Galicia, sumarás a
          túa voz ao noso esforzo por construír unha Europa máis unida e
          solidaria. Cremos na importancia de traballar xuntos para superar os
          desafíos do noso tempo."
          />
        </p>
        <h2 className="text-xl font-semibold mt-4">
          <FormattedMessage defaultMessage="2. Oportunidades de aprendizaxe e participación" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Ofrecemos actividades e eventos que te permitirán
          aprender máis sobre a Unión Europea e como funciona. Dende debates e
          conferencias ata intercambios culturais, terás moitas oportunidades
          para crecer intelectualmente e socialmente. Podes atopar máis información
          sobre os nosos eventos e proxectos dende o menú superior."
          />
          {/*<Link
            href="/projects"
            className="block lg:relative my-4 lg:inline-block lg:mt-0 underline text-blue-600 opacity-80 hover:opacity-100 transition"
          >
            <FormattedMessage defaultMessage="Atopa máis información sobre os nosos eventos e proxectos dende o menú superior." />
      </Link>*/}
        </p>
        <h2 className="text-xl font-semibold mt-4">
          <FormattedMessage defaultMessage="3. Networking e colaboración" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Estamos en contacto con outras organizacións e
          institucións a nivel local, nacional e europeo. Uníndote a nós, ampliarás a túa rede de contactos e
          poderás colaborar en proxectos interesantes."
          />
        </p>
        <h2 className="text-xl font-semibold mt-4">
          <FormattedMessage defaultMessage="4. Compromiso xuvenil" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="A
          nosa sección é nova, así que estamos cheos de enerxía e ideas frescas. Se
          buscas un grupo comprometido de xóvenes que queren facer a diferenza
          en Galicia e en Europa, JEF Galicia é o lugar onde debes estar."
          />
        </p>
        <h2 className="text-xl font-semibold mt-4">
          <FormattedMessage defaultMessage="5. Independencia política" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Traballamos dun xeito transpartidista e independente.
          O noso obxectivo é a Unión Europea, non a política partidaria. Aquí, o
          que nos une é a nosa paixón por Europa."
          />
        </p>

        <BoxComponent className='mt-6'>
          {message ? (
            message
          ) : (
            <p className="font-semibold">
              <FormattedMessage
                defaultMessage="Forma parte da próxima xeración de europeístas!"
                id="become-part-of-the-new-gen-of-europeanists"
              />
            </p>
          )}
          <a
            href="https://forms.gle/LbS1HdFnRErEPCrY7"
            type="submit"
            className="w-full"
          >
            <ButtonComponent className="w-full">
              <FormattedMessage defaultMessage="Inscríbete!" />
            </ButtonComponent>
          </a>
          {/*
                <form onSubmit={subscribe}>
                    <label htmlFor="email-input" className='mr-6'>O teu email</label>
                    <input
                        id="email-input"
                        name="email"
                        placeholder="eu@email.com"
                        ref={inputEl}
                        required
                        type="email"
                        className='rounded border border-black border-opacity-30 p-2 mr-6 text-sm'
                    />
                    <button type="submit" className='inline-block text-sm px-4 py-2 leading-none border rounded transition text-black border-black dark:border-white dark:hover:border-transparent dark:text-white border-opacity-30 hover:border-transparent hover:text-white hover:bg-primary mt-4 lg:mt-0'>{'Inscribirme 💌'}</button>
                </form>
                */}
        </BoxComponent>
      </BoxComponent>
    </>
  );
}
