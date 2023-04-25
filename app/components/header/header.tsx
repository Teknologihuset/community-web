'use client'

import {useState} from 'react';
import Link from 'next/link'
import './header.module.css'
import LogoutButton from "#/app/components/auth/LogoutButton";

export function Header() {
  const [burger, setBurger] = useState(false);

  return (
    <nav className={`navbar is-fixed-top`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <a role="button"
           onClick={() => setBurger(!burger)}
           className={burger ? "navbar-burger is-active" : "navbar-burger"}
           aria-label="menu" aria-expanded="false"
           data-target="navbarCommunityWeb">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarCommunityWeb" className={burger ? "navbar-menu is-active" : "navbar-menu"}>
        <div className="navbar-start">
          <Link className="navbar-item" href="/community">Hjem</Link>
          <Link className="navbar-item" href="/community/calendar">Kalendar</Link>
          <Link className="navbar-item" href="/community/events">Events</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
