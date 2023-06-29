import styles from "./Background.module.scss";

const Background = ({ bgStyles }) => {
  return <div className={ styles.background } style={ bgStyles }></div>;
}

export default Background;