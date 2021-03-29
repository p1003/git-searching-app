import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser, useUserData } from "../../API"
import { Paging } from "../Paging"
import { DEFAULT_PER_PAGE } from '../../utils'
import styles from "./styles.module.css"
import globalStyles from "../../global.module.css"

export const UserView: FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState("");

    useEffect(() => {
        setCurrentPage(1);
    }, [view])

    const { username } = useParams<{ username: string }>();

    const {
        data: userData,
        isLoading,
        isError
    } = useUser(username);

    const {
        data: userRepos,
        isLoading: isReposLoading,
        isError: isReposError
    } = useUserData(username, "repos", currentPage);

    const {
        data: userFollowers,
        isLoading: isFollowersLoading,
        isError: isFollowersError
    } = useUserData(username, "followers", currentPage);



    return (
        <div>
            <Link to="/">Searching page</Link>
            { isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    <img className={globalStyles.UserImage} src={userData?.avatar_url} alt="logo" />
                    <p>{userData?.login}</p>
                    <button onClick={() => setView("Repositories")}>Repositories {userData?.public_repos}</button>
                    <button onClick={() => setView("Followers")}>Followers {userData?.followers}</button>
                    {view === "Repositories" ?
                        <>
                            <Paging
                                currentPage={currentPage}
                                maxPage={userData ? Math.ceil(userData?.public_repos/DEFAULT_PER_PAGE) : 1}
                                setCurrentPage={setCurrentPage} />
                            { isReposLoading ? (
                                <p>Loading...</p>
                            ) : isReposError ? (
                                <p>Error occured</p>
                            ) : userRepos?.map((repo: any, index: number) =>
                                <div key={repo.id}
                                    className={index % 2 === 0 ? styles.ResultBarEven : styles.ResultBarOdd}>

                                    <a href={repo?.html_url}>View on github</a>
                                    <p>Author: {repo.owner.login}</p>
                                    <p>Repo name: {repo.name}</p>
                                    <Link to={`/${repo.owner.login}/${repo.name}`}>More info</Link>
                                </div>
                            )}
                            <Paging
                                currentPage={currentPage}
                                maxPage={userData ? Math.ceil(userData?.public_repos/DEFAULT_PER_PAGE) : 1}
                                setCurrentPage={setCurrentPage} />
                        </>
                        : view === "Followers" &&
                        <>
                            <Paging
                                currentPage={currentPage}
                                maxPage={userData ? Math.ceil(userData?.followers/DEFAULT_PER_PAGE) : 1}
                                setCurrentPage={setCurrentPage} />
                            { isFollowersLoading ? (
                                <p>Loading...</p>
                            ) : isFollowersError ? (
                                <p>Error occured</p>
                            ) : userFollowers?.map((user: any, index: number) =>
                                <div key={user.login}
                                    className={index % 2 === 0 ? styles.ResultBarEven : styles.ResultBarOdd}>

                                    <img className={globalStyles.UserImage} src={user.avatar_url} alt="logo" />
                                    <Link to={`/${user.login}`}>{user.login}</Link>
                                </div>
                            )}
                            <Paging
                                currentPage={currentPage}
                                maxPage={userData ? Math.ceil(userData?.followers/DEFAULT_PER_PAGE) : 1}
                                setCurrentPage={setCurrentPage} />
                        </>

                    }
                </div>
            )}
        </div>
    )
}