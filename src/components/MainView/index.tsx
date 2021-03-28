import { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar"
import { useSearch } from "../../API";

export const MainView: FC = () => {

    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    useEffect(() => {
        setPage(1);
    }, [searchValue]);

    const {
        isLoading,
        isError,
        data: searchData,
        isPreviousData,
    } = useSearch(searchValue, searchType, page, perPage, sort, order, setMaxPage);

    //{props.userRepos && reposList()}
    return (
        <div className="MainView">
            <SearchBar
            setSearchValue={setSearchValue} 
            setSearchType={setSearchType} 
            setPerPage={setPerPage} 
            setSort={setSort} 
            setOrder={setOrder} 
            />
            <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
            > Previous Page </button>{' '}
            <button
                onClick={() => {
                    if (!isPreviousData && page < maxPage) {
                        setPage(page + 1)
                    }
                }}
                // Disable the Next Page button until we know a next page is available
                disabled={page === maxPage}
            > Next Page </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    { searchType === "users" &&
                        searchData &&
                        searchData?.items.map((user: any) =>
                            <div key={user.id}>
                                <p>{user.html_url}</p>
                                <p>{user.login}</p>
                                <Link to={`/${user.login}`}>More info</Link>
                            </div>
                        )
                    }
                    { searchType === "repositories" &&
                        searchData &&
                        searchData?.items.map((repo: any) =>
                            <div key={repo?.id}>
                                <p>{repo?.html_url}</p>
                                <p>{repo.owner.login}</p>
                                <p>{repo.name}</p>
                                <Link to={`/${repo.owner.login}/${repo.name}`}>More info</Link>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}