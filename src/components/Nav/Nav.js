import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ToggleNav from "../ToggleNav/ToggleNav";

import styles from "./Nav.module.scss";

export default function Nav() {

  const router = useRouter();

  const [ active, setActive ] = useState(false);

  const handleToggle = () => setActive(!active);
  
  return (
    <header className={ styles.nav }>
      <div className={ styles.nav__container }>
        <div className={ styles.nav__head }>
          <div
            className={ styles.nav__toggle }
            onClick={ handleToggle }
          >
            <ToggleNav active={ active ? true : false } />
          </div>
        </div>
        <div className={ `${ styles.nav__body } ${ active ? styles.active : "" }` }>
          <nav className={ styles.nav__menu }>
            <ul className={ styles.nav__list }>
              <li
                className={ styles.nav__item }
                onClick={ handleToggle }
              >
                <Link
                  className={ `${ styles.nav__link } ${ router.pathname === "/" ? styles.selected : "" }` }
                  href="/"
                >
                  <span>Accueil</span>
                </Link>
              </li>
              <li
                className={ styles.nav__item }
                onClick={ handleToggle }
              >
                <Link
                  className={ `${ styles.nav__link } ${ router.pathname === "/skills" ? styles.selected : "" }` }
                  href="/skills"
                >
                  <span>Compétences</span>
                </Link>
              </li>
              <li
                className={ styles.nav__item }
                onClick={ handleToggle }
              >
                <Link
                  className={ `${ styles.nav__link } ${ router.pathname === "/references" ? styles.selected : "" }` }
                  href="/references"
                >
                  <span>Références</span>
                </Link>
              </li>
              <li
                className={ styles.nav__item }
                onClick={ handleToggle }
              >
                <Link
                  className={ `${ styles.nav__link } ${ router.pathname === "/experiences" ? styles.selected : "" }` }
                  href="/experiences"
                >
                  <span>Parcours</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
