import styles from './Section.module.scss';

const Section = ({ id, martTop = true, marBottom = true, children }) => {

  return (
    <section
      id={ id }
      className={ 
        `${styles.section}
        ${!martTop ? styles.noMarginTop : ""}
        ${!marBottom ? styles.noMarginBottom : ""}`
      }
    >
      <div className={ styles.section__wrapper }>
        { children }
      </div>
    </section>
  );
};

export default Section;