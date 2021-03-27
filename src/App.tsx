import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from "react-router-dom";
import { MainView } from "./components/MainView"
import { NavBar } from "./components/NavBar"
import { RepoView } from './components/RepoView';
import { UserView } from "./components/UserView"
import { useUserRepos, useSearch } from "./API";
import { RepoViewRedirect } from './components/RepoViewRedirect';

function App() {

    // const [username, setUsername] = useState("");
    // const [repoName, setRepoName] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [searchValue]);

    // useEffect(() => {
    //     setRepoName("");
    // }, [username]);
    // const {
    //     data: userRepos,
    //     error: userReposError,
    //     refetch: refetchUser
    // } = useUserRepos(username);

    // const {
    //     data: searchUsersData,
    //     error: usersError,
    //     refetch: refetchUsers
    // } = useSearchUsers(searchValue);

    const {
        isLoading,
        isError,
        error,
        data: searchData,
        isFetching,
        isPreviousData,
    } = useSearch(searchValue, searchType, page.toString(), setMaxPage);

    // : isError ? (
    //     <div>Error: {error.message}</div>
    // ) 

    return (
        <div>
            <Switch>
                <Route path="/:user/:repo">
                    <RepoViewRedirect />
                </Route>
                <Route path="/:user">
                    <UserView />
                </Route>
                <Route>
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
                                <div>
                                    {searchData &&
                                        <div>
                                            {searchData?.items.map((user: any) =>
                                                <div key={user?.id}>
                                                    <p>{user?.html_url}</p>
                                                    <p>{user.name}</p>
                                                    <Link to={`/${user.name}`}>More info</Link>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>
                            }
                            {searchType === "repositories" &&
                                <div>
                                    {searchData &&
                                        <div>
                                            {searchData?.items.map((repo: any) =>
                                                <div key={repo?.id}>
                                                    <p>{repo?.html_url}</p>
                                                    <p>{repo.owner.login}</p>
                                                    <p>{repo.name}</p>
                                                    <Link to={`/${repo.owner.login}/${repo.name}`}>More info</Link>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    )}
                </Route>
            </Switch>
        </div>

    );
}

export default App;

// {repoName !== "" && <button onClick={() => setRepoName("")}>Back to repo list</button>}
//                             {username &&
//                                 <div>
//                                     <p>username: {username}</p>
//                                     {userReposError && (
//                                         <div>Error! {(userReposError as any).message}</div>
//                                     )}
//                                     {repoName !== "" ?
//                                         <div>
//                                             {repoName &&
//                                                 <RepoView username={username} repoName={repoName} />
//                                             }
//                                         </div> :
//                                         <MainView userRepos={userRepos} setRepoName={setRepoName} />
//                                     }
//                                 </div>
//                             }