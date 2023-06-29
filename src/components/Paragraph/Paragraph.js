import styles from "./Paragraph.module.scss";

const Paragraph = ({ classname, children }) => {
  return <p className={ `${ styles.paragraph } ${ classname }` }>{ children }</p>;
};

export default Paragraph;