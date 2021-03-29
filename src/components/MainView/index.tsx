import { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar"
import { useSearch } from "../../API";
import { Paging } from "../Paging"
import styles from "./styles.module.css";
import globalStyles from "../../global.module.css";

export const MainView: FC = () => {

    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [perPage, setPerPage] = useState(30);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    useEffect(() => {
        setCurrentPage(1);
        setMaxPage(0);
    }, [searchValue]);

    const {
        isLoading,
        isError,
        data: searchData,
    } = useSearch(searchValue, searchType.toLowerCase(), currentPage, perPage, sort, order, setMaxPage);

    return (
        <div className={styles.MainView}>
            <SearchBar
                setSearchValue={setSearchValue}
                setSearchType={setSearchType}
                setPerPage={setPerPage}
                setSort={setSort}
                setOrder={setOrder}
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div className={styles.ResultsContainer}>
                    { searchType === "Users" &&
                        searchData &&
                        searchData?.items.map((user: any, index: number) =>
                            <div key={user.id}
                                className={index % 2 === 0 ? styles.ResultBarEven : styles.ResultBarOdd}>

                                <p>{user.html_url}</p>
                                <p>{user.login}</p>
                                <Link to={`/${user.login}`}>More info</Link>
                            </div>
                        )
                    }
                    { searchType === "Repositories" &&
                        searchData &&
                        searchData?.items.map((repo: any, index: number) =>
                            <div key={repo?.id}
                                className={index % 2 === 0
                                    ? styles.ResultBarEven
                                    : styles.ResultBarOdd}>
                                <p>{repo?.html_url}</p>
                                <p>{repo.owner.login}</p>
                                <p>{repo.name}</p>
                                <Link to={`/${repo.owner.login}/${repo.name}`}>More info</Link>
                            </div>
                        )
                    }
                </div>
            )}
            <Paging
                currentPage={currentPage}
                maxPage={maxPage}
                setCurrentPage={setCurrentPage} />
        </div>
    )
}