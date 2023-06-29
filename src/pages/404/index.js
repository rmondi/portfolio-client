import React from "react";
import Head from "next/head";
import Image from "next/image";

import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title";
import Paragraph from "@/components/Paragraph/Paragraph";
import Button from "@/components/Button/Button";

import svg from "@/assets/svg/404.svg";

import styles from "./404.module.scss";

export default function NotFound() {
  
  return (
    <>
      <Head>
        <title>Page non trouvées</title>
      </Head>
      <Section
        id="404"
        martTop={ false }
        marBottom={ false }
      >
        <div className={ styles.notFound }>
          <div className={ styles.notFound__header }>
            <Title level={ 1 }>
              Page non trouvées...
            </Title>
          </div>
          <div className={ styles.notFound__body }>
            <div className={ styles.notFound__svg }>
              <Image
                src={ svg }
                alt=""
              />
            </div>
            <div className={ styles.notFound__text }>
              <Paragraph>
                { "Je suis désolé, mais la page que vous recherchez n'existe pas ou plus..." }
              </Paragraph>
            </div>
            <div className={ styles.notFound__cta }>
              <Button label="Retourner à l'accueil" href="/" />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
