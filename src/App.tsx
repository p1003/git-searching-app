import { Switch, Route } from 'react-router';
import { MainView } from "./components/MainView"
import { UserView } from "./components/UserView"
import { RepoView } from './components/RepoView';

function App() {

    // const [searchValue, setSearchValue] = useState("");
    // const [searchType, setSearchType] = useState("");
    // const [page, setPage] = useState(1);
    // const [maxPage, setMaxPage] = useState(1);
    // const [perPage, setPerPage] = useState(30);
    // const [sort, setSort] = useState("");

    // useEffect(() => {
    //     setPage(1);
    // }, [searchValue]);

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

    // const {
    //     isLoading,
    //     isError,
    //     error,
    //     data: searchData,
    //     isFetching,
    //     isPreviousData,
    // } = useSearch(searchValue, searchType, page, perPage, sort, setMaxPage);

    // : isError ? (
    //     <div>Error: {error.message}</div>
    // ) 

    return (
        <div>
            <Switch>
                <Route path="/:username/:repoName">
                    <RepoView />
                </Route>
                <Route path="/:username">
                    <UserView />
                </Route>
                <Route>
                    <MainView/>
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