import React from "react";
import Moment from "react-moment";
import "moment/locale/fr";

import styles from "./Dates.module.scss";

export default function Dates({ startDate, endDate }) {
  
  return (
    <div className={ styles.dates }>
      {
        endDate === null &&
        <p className={ styles.dates__since }>Depuis le</p>
      }
      <Moment locale="fr" format="LL" element="span">{ startDate }</Moment>
      {
        endDate !== null &&
        <Moment locale="fr" format="LL" element="span">{ endDate }</Moment>
      }
    </div>
  )
}
