import React from "react";

export default function CommunityWebHome() {
    return (
        <main className={`has-text-centered`}>
            <section className={`hero`}>
                <div className={`hero-body`}>
                    <div className="container">
                        <h1 className="title">Community Web</h1>
                        <h2 className="subtitle">Teknologihuset Booking</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className={"container"}>
                    <div className={"columns is-centered"}>
                        <div className={"column is-half has-text-centered"}>
                            <div className={"box"}>
                                <figure className={"is-inline-block"}>
                                    <span className={"fas fas-calendar"} />
                                </figure>
                                <h1 className="title">Kalender</h1>
                                <h2 className="subtitle">
                                    Sjekk tilgjengelige rom
                                </h2>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
