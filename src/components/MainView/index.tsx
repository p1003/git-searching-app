import { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar"
import { useSearch } from "../../API";

export const MainView: FC = () => {

    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [sort, setSort] = useState("");

    useEffect(() => {
        setPage(1);
    }, [searchValue]);

    const {
        isLoading,
        isError,
        error,
        data: searchData,
        isFetching,
        isPreviousData,
    } = useSearch(searchValue, searchType, page, perPage, sort, setMaxPage);

    //{props.userRepos && reposList()}
    return (
        <div className="MainView">
            <NavBar setSearchValue={setSearchValue} setSearchType={setSearchType} />
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

// type MainViewProps = {
//     userRepos: any;
//     setRepoName: (name: string) => void;
// }

// export const MainView: FC<MainViewProps> = props => {

//     const repoClick = (text: string) => {
//         console.log(text);
//         props.setRepoName(text);
//     };

//     function reposList() {
//         const list = props.userRepos?.map((repo: any) =>
//             <li key={repo.id}>
//                 <p onClick={() => repoClick(repo.name)}>{repo.name}</p>
//                 <p>{repo.html_url}</p>
//             </li>
//         );
//         return (
//             <ul>
//                 {list}
//             </ul>
//         )
//     };
    
//     return (
//         <div className="MainView">
//             {props.userRepos && reposList()}
//         </div>
//     )
// }