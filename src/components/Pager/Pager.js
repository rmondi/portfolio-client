import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pager.module.scss";

export default function Pager({ pagination, onPageSelect }) {

  const { page: currentPage, pageCount } = pagination;

  const handleOnClick = (e) => {
    onPageSelect(e.nextSelectedPage + 1);
  };
  
  return (
    <div className={ styles.pager }>
      <ReactPaginate
        className={ styles.pager__list }
        pageClassName={ styles.pager__item }
        pageLinkClassName={ styles.pager__link }
        activeLinkClassName={ styles.pager__active }
        previousClassName={ styles.pager__prev }
        nextClassName={ styles.pager__next }
        marginPagesDisplayed={ 2 }
        pageRangeDisplayed={ 5 }
        previousLabel={ null }
        nextLabel={ null }
        breakLabel={ "..." }
        initialPage={ currentPage -1 }
        pageCount={ pageCount }
        onClick={ handleOnClick }
        disableInitialCallback={ false }
      />
    </div>
  )
}
