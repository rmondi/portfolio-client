import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

import styles from "./Footer.module.scss";

export default function Footer() {
  
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ data, setData ] = useState({});

  useEffect(() => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const query = `
      query {
        footer {
          data {
            attributes {
              name,
              links {
                label,
                url,
                icon {
                  data {
                    attributes {
                      url,
                      width,
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    fetch(process.env.NEXT_PUBLIC_API_HOST, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({query: query, variables: {}})
    })
    .then(response => response.json())
    .then(result => {
      setData(result.data.footer.data.attributes);
      setIsLoaded(true);
    })
    .catch(error => console.error(error.message));
  }, [])
  
  if (isLoaded) {
    return (
      <footer className={ styles.footer }>
        <div className={ styles.footer__wrapper }>
          <div className={ styles.footer__content }>
            <div className={ styles.footer__name }>
              { data.name }
            </div>
            <div className={ styles.footer__links }>
              {
                data.links.map(link => {
                  return (
                    <a
                      key={ uuidv4() }
                      className={ styles.footer__link }
                      title={ link.label }
                      href={ link.url }
                      target="__blank"
                    >
                      <Image
                        className={ styles.footer__icon }
                        alt=""
                        src={ `${process.env.NEXT_PUBLIC_API_URL}${link.icon.data.attributes.url}` }
                        width={ 20 }
                        height={ 20 }
                      />
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
