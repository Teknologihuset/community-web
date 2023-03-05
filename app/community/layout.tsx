import React, {ReactNode} from 'react'
import type {Metadata} from 'next'
import {Header} from "../components/header";

export const metadata: Metadata = {
    description: 'Community Web - Teknologihuset',
    icons: {
        icon: '/favicon.ico'
    }
};

export default function LoggedInRootLayout({ children }: { children: ReactNode }) {
    return (
        <body className="has-navbar-fixed-top">
            <Header />
            {children}
        </body>
    )
}