import React, { useEffect, useRef } from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

import styles from "./Container.module.scss";

export default function Container({ children }) {

  const refMain = useRef(null);

  useEffect(() => {
    
    const classTop = "isScrollToTop";
    const classBottom = "isScrollToBottom";
    const classScrolled = "isScrolled";
    
    let scrollPos = 0;

    window.addEventListener('scroll', (e) => {
      let currentScrollPos = window.scrollY;

      if (currentScrollPos !== scrollPos) refMain.current.classList.add(classScrolled);

      if (currentScrollPos > scrollPos) {
        refMain.current.classList.add(classBottom);
        refMain.current.classList.remove(classTop);
      }

      if (currentScrollPos < scrollPos) {
        refMain.current.classList.add(classTop);
        refMain.current.classList.remove(classBottom);
      }

      if (currentScrollPos === 0) {
        refMain.current.classList.remove(classScrolled);
        refMain.current.classList.remove(classTop);
      }

      scrollPos = currentScrollPos;
    });
  }, []);
  
  return (
    <div
      ref={ refMain }
      className={ styles.mainLayout }
    >
      <Nav />
      <main className="main">
        { children }
      </main>
      <Footer />
    </div>
  )
}
