"use client"

async function getData(): Promise<Response> {
    const res = await fetch(`http://localhost:3050/api/demo/fengsel`, {
        cache: 'no-store' // only set for demonstration purposes
        //next: { revalidate: 10 } // for isr
    })

    return await res.json();
}

export default function CommunityWebHome() {
    return (
        <main className={`has-text-centered`}>
            <div className={`hero`}>
                <div className={`hero-body`}>
                    <div className="container is-max-desktop">
                        <h1 className="title">Community Web</h1>
                        <h2 className="subtitle">Teknologihuset kalender applikasjon</h2>
                    </div>
                </div>
            </div>
        </main>
    )
}
