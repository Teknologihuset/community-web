'use client'

import {signIn} from 'next-auth/react'
import Image from "next/image";
import logo from "#/public/logo.png";
import React from "react";
import {Provider} from "next-auth/providers";

export function LoginForm({providers}: {providers: Provider[]}) {
    return (
        <section className={`hero is-fullheight`}>
            <div className={`hero-body`}>
                <div className="container">
                    <div className={"columns is-centered"}>
                        <div className={"column is-half has-text-centered"}>
                            <div className={"box"}>
                                <figure className={"is-inline-block"}>
                                    <Image priority={true}
                                           className="image"
                                           src={logo}
                                           alt="Teknologihuset logo" />
                                </figure>
                                <h1 className="title">Community Web</h1>
                                <h2 className="subtitle">
                                    Log in to continue.
                                </h2>
                                <br />
                                {Object.values(providers).map((provider) => (
                                    <div key={provider.name}>
                                        <button className={"button is-primary"}
                                                onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/community' })}>
                                            Sign in with {provider.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}