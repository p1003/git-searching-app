import { FC, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useRepo, useRepoData } from "../../../API";
import { Paging } from "../../Paging"
import { ViewChanger } from '../../ViewChanger';
import styles from "./styles.module.css"
import globalStyles from "../../../global.module.css"

export const RepoView: FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxConPage, setMaxConPage] = useState(1);
    const [maxCommitPage, setMaxCommitPage] = useState(1);
    const [view, setView] = useState("");

    useEffect(() => {
        setCurrentPage(1);
    }, [view])

    const { username } = useParams<{ username: string }>();
    const { repoName } = useParams<{ repoName: string }>();

    const {
        data: repoData,
        isLoading,
        isError
    } = useRepo(username, repoName);
    const {
        data: repoContributors,
        isLoading: isContributorsLoading,
        isError: isContributorsError
    } = useRepoData(username, repoName, "contributors", currentPage);
    const {
        data: repoCommits,
        isLoading: isCommitsLoading,
        isError: isCommitsError
    } = useRepoData(username, repoName, "commits", currentPage);

    useEffect(() => {
        console.log(maxConPage + "  " + repoContributors?.pages);
        if (repoContributors?.pages != null && repoContributors?.pages > maxConPage) {
            setMaxConPage(repoContributors?.pages);
        }
    }, [repoContributors])

    useEffect(() => {
        console.log(maxCommitPage + "  " + repoCommits?.pages);
        if (repoCommits?.pages != null && repoCommits?.pages > maxCommitPage) {
            setMaxCommitPage(repoCommits?.pages);
        }
    }, [repoCommits])

    return (
        <div>
            { isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    <div className={globalStyles.Head}>
                        <div>
                            <b className={globalStyles.Title}>Github Searching App</b>
                            <img className={globalStyles.Logo} src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" width="60" height="60" />
                        </div>
                        <p className={globalStyles.TitleB}>{repoName}</p>
                        <Link className={globalStyles.Link} to={`/${username}`}>{username}</Link>
                        <button className={globalStyles.BasicElement}>
                            <Link className={globalStyles.Link} to="/">Searching page</Link>
                        </button>
                        <ViewChanger setView={setView} view1="Contributors" view2="Commits" selectedView={view} />

                    </div>
                    {view === "Contributors" ?
                        <>
                            { isContributorsLoading ? (
                                <p>Loading...</p>
                            ) : isContributorsError ? (
                                <p>Error occured</p>
                            ) : repoContributors?.array.map((user: any, index: number) =>
                                <div key={index}
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
                                maxPage={maxConPage}
                                setCurrentPage={setCurrentPage} />
                        </>
                        : view === "Commits" &&
                        <>
                            { isCommitsLoading ? (
                                <p>Loading...</p>
                            ) : isCommitsError ? (
                                <p>Error occured</p>
                            ) : repoCommits?.array.map((commit: any, index: number) =>
                                <div key={index}
                                    className={index % 2 === 0 ? globalStyles.ResultBarEven : globalStyles.ResultBarOdd}>
                                    <p>{commit.commit.author.name}</p>
                                    <p>{commit.commit.message}</p>
                                    <p>{commit.commit.author.date}</p>
                                </div>
                            )}
                            <Paging
                                currentPage={currentPage}
                                maxPage={maxCommitPage}
                                setCurrentPage={setCurrentPage} />
                        </>

                    }
                </div>
            )}
        </div>
    )
}