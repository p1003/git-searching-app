import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useUser, useUserData } from "../../../API"
import { Paging } from "../../Paging"
import { DEFAULT_PER_PAGE } from '../../../utils'
import { ViewChanger } from "../../ViewChanger"
import { Repo } from "../Repo";
import { User } from "../User";
import styles from "./styles.module.css"
import sharedStyles from "../../../shared.module.css"

export const UserView: FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
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


    const [view, setView] = useState("Repositories " + userData?.public_repos);

    useEffect(() => {
        setCurrentPage(1);
    }, [view])

    useEffect(() => {
        setView("Repositories " + userData?.public_repos);
    }, [userData?.public_repos])

    return (
        isLoading ? (
            <p className={sharedStyles.TitleB}>Loading...</p>
        ) : isError ? (
            <p className={sharedStyles.TitleB}>Error occured</p>
        ) : (
            <div className="UserView">
                <div className={sharedStyles.Head}>
                    <div className={sharedStyles.Header}>
                        <div className={sharedStyles.AppLogo}>
                            <b className={sharedStyles.Title}>Github Searching App</b>
                            <img className={sharedStyles.Logo} src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" width="60" height="60" />
                        </div>
                        <button className={sharedStyles.BasicElement}>
                            <Link className={sharedStyles.Link} to="/">Searching page</Link>
                        </button>
                    </div>

                    <div className={styles.mainInfo}>
                        <img className={sharedStyles.UserImage} src={userData?.avatar_url} alt="logo" />
                        <b className={sharedStyles.TitleB}>{userData?.login}</b>
                        <button
                            className={sharedStyles.BasicElement}>
                            <a className={sharedStyles.Link} href={userData?.html_url}>View on github</a>
                        </button>
                    </div>

                    <ViewChanger setView={setView} view1={"Repositories " + userData?.public_repos} view2={"Followers " + userData?.followers} selectedView={view} />
                </div>
                {view === "Repositories " + userData?.public_repos ?
                    <>
                        { isReposLoading ? (
                            <p className={sharedStyles.TitleB}>Loading...</p>
                        ) : isReposError ? (
                            <p className={sharedStyles.TitleB}>Error occured</p>
                        ) : userRepos?.map((repo: any, index: number) =>
                            <Repo repo={repo} index={index} key={index} />
                        )}
                        <Paging
                            currentPage={currentPage}
                            maxPage={userData ? Math.ceil(userData?.public_repos / DEFAULT_PER_PAGE) : 1}
                            setCurrentPage={setCurrentPage} />
                    </>
                    : view === "Followers " + userData?.followers &&
                    <>
                        { isFollowersLoading ? (
                            <p className={sharedStyles.TitleB}>Loading...</p>
                        ) : isFollowersError ? (
                            <p className={sharedStyles.TitleB}>Error occured</p>
                        ) : userFollowers?.map((user: any, index: number) =>
                            <User user={user} index={index} key={index} />
                        )}
                        <Paging
                            currentPage={currentPage}
                            maxPage={userData ? Math.ceil(userData?.followers / DEFAULT_PER_PAGE) : 1}
                            setCurrentPage={setCurrentPage} />
                    </>

                }
            </div>
        )
    )
}