import React, {ReactNode} from 'react'
import '../styles/globals.scss'
import type {Metadata} from 'next'

export const metadata: Metadata = {
    description: 'Community Web',
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>Community-Web</title>
        </head>
            {children}
        </html>
    )
}