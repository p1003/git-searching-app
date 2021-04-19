import { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { SearchBar } from "../../SearchBar"
import { useSearch } from "../../../API";
import { Paging } from "../../Paging"
import { ViewChanger } from '../../ViewChanger';
import styles from "./styles.module.css";
import globalStyles from "../../../global.module.css";

export const MainView: FC = () => {

    const [searchValue, setSearchValue] = useState("");
    const [view, setView] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [maxUsersPage, setMaxUsersPage] = useState(0);
    const [maxReposPage, setMaxReposPage] = useState(0);
    const [perPage, setPerPage] = useState(30);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    useEffect(() => {
        setCurrentPage(1);
        setMaxUsersPage(0);
        setMaxReposPage(0);
    }, [searchValue]);

    const {
        isLoading: isUsersLoading,
        isError: isUsersError,
        data: searchedUsers,
    } = useSearch(searchValue, "users", currentPage, perPage, sort, order, "", "", "", setMaxUsersPage);

    const {
        isLoading: isReposLoading,
        isError: isReposError,
        data: searchedRepos,
    } = useSearch(searchValue, "repositories", currentPage, perPage, sort, order, "", "", "", setMaxReposPage);

    return (
        <div className={styles.MainView}>
            <div className={globalStyles.Head}>
                <div>
                    <b className={globalStyles.Title}>Github Searching App</b>
                    <img className={globalStyles.Logo} src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" width="60" height="60" />
                </div>
                <SearchBar
                    setSearchValue={setSearchValue}
                    setPerPage={setPerPage}
                    setSort={setSort}
                    setOrder={setOrder}
                />
                <ViewChanger setView={setView} view1="Users" view2="Repositories" selectedView={view} />
            </div>
            <div className={styles.ResultsContainer}>
                {view === "Users" &&
                    (<>{isUsersLoading ? (
                        <p>Loading...</p>
                    ) : isUsersError ? (
                        <p>Error occured</p>
                    ) : searchedUsers?.items.length > 0 ?
                        searchedUsers?.items.map((user: any, index: number) =>
                            <div key={user.id}
                                className={index % 2 === 0 ? globalStyles.ResultBarEven : globalStyles.ResultBarOdd}>
                                <img className={globalStyles.UserImage} src={user.avatar_url} alt="logo" />
                                <b className={globalStyles.TitleB}>{user.login}</b>
                                <button
                                    className={globalStyles.BasicElement}>
                                    <a className={globalStyles.Link} href={user.html_url}>View on Github</a>
                                </button>
                                <button
                                    className={globalStyles.BasicElement}>
                                    <Link className={globalStyles.Link} to={`/${user.login}`}>More info</Link>
                                </button>
                            </div>
                        ) : (
                            <p className={globalStyles.TitleB}>No results found :(</p>
                        )}
                        < Paging
                            currentPage={currentPage}
                            maxPage={maxUsersPage}
                            setCurrentPage={setCurrentPage} />
                    </>)
                }
                {view === "Repositories" &&
                    (<>{isReposLoading ? (
                        <p>Loading...</p>
                    ) : isReposError ? (
                        <p>Error occured</p>
                    ) : searchedRepos?.items.length > 0 ?
                        searchedRepos?.items.map((repo: any, index: number) =>
                            <div key={repo?.id}
                                className={index % 2 === 0 ? globalStyles.ResultBarEven : globalStyles.ResultBarOdd}>

                                <p className={globalStyles.TitleB}>{repo.name}</p>
                                <p>{repo.owner.login}</p>
                                <button
                                    className={globalStyles.BasicElement}>
                                    <a className={globalStyles.Link} href={repo?.html_url}>View on github</a>
                                </button>
                                <button
                                    className={globalStyles.BasicElement}>
                                    <Link className={globalStyles.Link} to={`/${repo.owner.login}/${repo.name}`}>More info</Link>
                                </button>
                            </div>
                        ) : (
                            <p className={globalStyles.TitleB}>No results found :(</p>
                        )}
                        < Paging
                            currentPage={currentPage}
                            maxPage={maxReposPage}
                            setCurrentPage={setCurrentPage} />
                    </>)
                }
            </div>
        </div >
    )
}