import styles from "./Title.module.scss";

const Title = ({ level, children }) => {

  let title;
  
  switch(level) {
    case 1:
      title = <h1 className={ styles.title }>{ children }</h1>
    break
    case 2:
    default:
      title = <h2 className={ styles.title }>{ children }</h2>
    break
  }

  return title;
};

export default Title;