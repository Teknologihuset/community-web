import React from "react";
import {LoginForm} from "#/app/components/LoginForm";

export default async function Application() {

    const providers = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`, {
        cache: 'no-store'
    }).then(value => value.json());

    return (
        <body className="">
            <main>
                <LoginForm providers={providers} />
            </main>
        </body>
    )
}
