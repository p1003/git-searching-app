import { FC, useEffect, useState } from 'react';
import { SearchBar } from "../../SearchBar"
import { useSearch } from "../../../API";
import { Paging } from "../../Paging"
import { ViewChanger } from '../../ViewChanger';
import { Repo } from "../Repo";
import { User } from "../User";
import styles from "./styles.module.css";
import sharedStyles from "../../../shared.module.css";

export const MainView: FC = () => {

    const [searchValue, setSearchValue] = useState("");
    const [view, setView] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [maxUsersPage, setMaxUsersPage] = useState(0);
    const [maxReposPage, setMaxReposPage] = useState(0);
    const [perPage, setPerPage] = useState(30);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    const {
        isLoading: isUsersLoading,
        isError: isUsersError,
        data: searchedUsers,
    } = useSearch(searchValue, "users", currentPage, perPage, sort, order, setMaxUsersPage);

    const {
        isLoading: isReposLoading,
        isError: isReposError,
        data: searchedRepos,
    } = useSearch(searchValue, "repositories", currentPage, perPage, sort, order, setMaxReposPage);


    useEffect(() => {
        setCurrentPage(1);
        setMaxUsersPage(0);
        setMaxReposPage(0);
    }, [searchValue]);

    const [countU, setCountU] = useState(0);
    const [countR, setCountR] = useState(0);

    useEffect(() => {
        if (searchedUsers)
            setCountU(searchedUsers.total_count);
    }, [searchedUsers?.total_count])

    useEffect(() => {
        if (searchedRepos)
            setCountR(searchedRepos.total_count);
    }, [searchedRepos?.total_count])

    return (
        <div className={styles.MainView}>
            <div className={sharedStyles.Head}>
                <div className={sharedStyles.AppLogo}>
                    <b className={sharedStyles.Title}>Github Searching App</b>
                    <img className={sharedStyles.Logo} src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" width="60" height="60" />
                </div>
                <SearchBar
                    setSearchValue={setSearchValue}
                    setPerPage={setPerPage}
                    setSort={setSort}
                    setOrder={setOrder}
                />
                <ViewChanger setView={setView} view1={`Users ${countU}`} view2={`Repositories ${countR}`} selectedView={view} />
            </div>
            <div className={styles.ResultsContainer}>
                {view === `Users ${countU}` &&
                    (<>{isUsersLoading ? (
                        <p className={sharedStyles.TitleB}>Loading...</p>
                    ) : isUsersError ? (
                        <p className={sharedStyles.TitleB}>Error occured</p>
                    ) : searchedUsers?.items.length > 0 ?
                        searchedUsers?.items.map((user: any, index: number) =>
                            <User user={user} index={index} key={index} />
                        ) : (
                            <p className={sharedStyles.TitleB}>No results found :(</p>
                        )}
                        < Paging
                            currentPage={currentPage}
                            maxPage={maxUsersPage}
                            setCurrentPage={setCurrentPage} />
                    </>)
                }
                {view === `Repositories ${countR}` &&
                    (<>{isReposLoading ? (
                        <p className={sharedStyles.TitleB}>Loading...</p>
                    ) : isReposError ? (
                        <p className={sharedStyles.TitleB}>Error occured</p>
                    ) : searchedRepos?.items.length > 0 ?
                        searchedRepos?.items.map((repo: any, index: number) =>
                            <Repo repo={repo} index={index} key={index} />
                        ) : (
                            <p className={sharedStyles.TitleB}>No results found :(</p>
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