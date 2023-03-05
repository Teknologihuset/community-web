import React from "react";
import Image from "next/image";
import logo from "#/public/logo.png";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    description: 'Community Web Login',
};

export default function Application() {
    return (
        <body className="">
            <main>
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
                                        <a className={"button is-primary"} href="/api/login">CONTINUE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </body>
    )
}
