'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import ButtonComponent from '../components/Button'
import BoxComponent from '../components/Box'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <BoxComponent>
            <h1 className="text-3xl font-semibold mb-6"><FormattedMessage defaultMessage="Erro" id='error' /></h1>
            <p className="mb-6">
                <FormattedMessage defaultMessage="Se queres contactar con nós para avisarnos deste erro, podes atopar os nosos datos de contacto na páxina de " id='contact-us-to-let-us-know' />{' '}
                <Link href="/contact" className="opacity-60">
                    <FormattedMessage defaultMessage="contacto" id='contact' />
                </Link>
                .
            </p>
            <ButtonComponent className="w-full"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }>
                <FormattedMessage defaultMessage="Probar outra vez" />
            </ButtonComponent>
        </BoxComponent>
    )
}