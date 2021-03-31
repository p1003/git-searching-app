import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser, useUserData } from "../../../API"
import { Paging } from "../../Paging"
import { DEFAULT_PER_PAGE } from '../../../utils'
import styles from "./styles.module.css"
import globalStyles from "../../../global.module.css"
import { ViewChanger } from "../../ViewChanger"

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
            <button className={globalStyles.BasicElement}>
                <Link className={globalStyles.Link} to="/">Searching page</Link>
            </button>
            { isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    <img className={globalStyles.UserImage} src={userData?.avatar_url} alt="logo" />
                    <b className={globalStyles.TitleB}>{userData?.login}</b>
                    
                    <ViewChanger setView={setView} view1={"Repositories " + userData?.public_repos} view2={"Followers " + userData?.followers} selectedView={view} />
                    {view === "Repositories " + userData?.public_repos ?
                        <>
                            { isReposLoading ? (
                                <p>Loading...</p>
                            ) : isReposError ? (
                                <p>Error occured</p>
                            ) : userRepos?.map((repo: any, index: number) =>
                                <div key={repo.id}
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
                            )}
                            <Paging
                                currentPage={currentPage}
                                maxPage={userData ? Math.ceil(userData?.public_repos / DEFAULT_PER_PAGE) : 1}
                                setCurrentPage={setCurrentPage} />
                        </>
                        : view === "Followers " + userData?.followers &&
                        <>
                            { isFollowersLoading ? (
                                <p>Loading...</p>
                            ) : isFollowersError ? (
                                <p>Error occured</p>
                            ) : userFollowers?.map((user: any, index: number) =>
                                <div key={user.login}
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
                            )}
                            <Paging
                                currentPage={currentPage}
                                maxPage={userData ? Math.ceil(userData?.followers / DEFAULT_PER_PAGE) : 1}
                                setCurrentPage={setCurrentPage} />
                        </>

                    }
                </div>
            )}
        </div>
    )
}