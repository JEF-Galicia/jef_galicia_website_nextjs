import React, { useRef, useState } from 'react';
import BoxComponent from '../components/Box';

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
        setMessage('Success! 🎉 You are now subscribed to the newsletter.');
    };

    return (
        <BoxComponent>
            <h1 className='text-3xl font-semibold mb-6'>Inscríbete!</h1>
            {message
                ? message
                : <p className='mb-6'>Forma parte da próxima xeración de europeístas!</p>}
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
        </BoxComponent>
    );
}