import { FC } from "react";
import { PAGES_RANGE } from "../../utils";
import styles from "./styles.module.css";

type PagingProps = {
    currentPage: number;
    maxPage: number;
    setCurrentPage: (page: number) => void;
}

export const Paging: FC<PagingProps> = props => {

    return (
        <div className={styles.PagesBar}>
            { Array.from(Array(props.maxPage).keys())
                .filter((elem: number) =>
                    (Math.abs(props.currentPage - elem - 1) <= PAGES_RANGE || elem + 1 === props.maxPage || elem === 0)
                )
                .map((elem: number) =>
                    elem + 1 === props.currentPage ?
                        <b className={styles.CurrentPage} key={elem}>{props.currentPage}</b>
                        : Math.abs(props.currentPage - elem - 1) === PAGES_RANGE && elem !== 0 && elem !== props.maxPage - 1 ?
                            <b className={styles.PageButton} key={elem}>...</b>
                            :
                            <b className={styles.PageButton} key={elem}
                                onClick={() => props.setCurrentPage(elem + 1)}>
                                {elem + 1}
                            </b>
                )
            }
        </div>
    )
}