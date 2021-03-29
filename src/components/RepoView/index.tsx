import { FC, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useRepo, useRepoData } from "../../API";
import { Paging } from "../Paging"
import styles from "./styles.module.css"
import globalStyles from "../../global.module.css"

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
        console.log(maxConPage+"  "+repoContributors?.pages);
        if(repoContributors?.pages != null && repoContributors?.pages > maxConPage) {
            setMaxConPage(repoContributors?.pages);
        }
    }, [repoContributors])

    useEffect(()=> {
        console.log(maxCommitPage+"  "+repoCommits?.pages);
        if(repoCommits?.pages != null && repoCommits?.pages > maxCommitPage) {
            setMaxCommitPage(repoCommits?.pages);
        }
    }, [repoCommits])

    return (
        <div>
            <Link to={`/${username}`}>Owner: {username}</Link>
            <p>Repository: {repoName}</p>
            <Link to="/">Searching page</Link>
            { isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occured</p>
            ) : (
                <div>
                    <button onClick={() => setView("Contributors")}>Contributors</button>
                    <button onClick={() => setView("Commits")}>Commits</button>
                    {view === "Contributors" ?
                        <>
                            <Paging
                                currentPage={currentPage}
                                maxPage={maxConPage}
                                setCurrentPage={setCurrentPage} />
                            { isContributorsLoading ? (
                                <p>Loading...</p>
                            ) : isContributorsError ? (
                                <p>Error occured</p>
                            ) : repoContributors?.array.map((user: any, index: number) =>
                                <div key={index}>
                                    <img className={globalStyles.UserImage} src={user.avatar_url} alt="logo" />
                                    <Link to={`/${user.login}`}>{user.login}</Link>
                                </div>
                            )}
                            <Paging
                                currentPage={currentPage}
                                maxPage={maxConPage}
                                setCurrentPage={setCurrentPage} />
                        </>
                        : view === "Commits" &&
                        <>
                            <Paging
                                currentPage={currentPage}
                                maxPage={maxCommitPage}
                                setCurrentPage={setCurrentPage} />
                            { isCommitsLoading ? (
                                <p>Loading...</p>
                            ) : isCommitsError ? (
                                <p>Error occured</p>
                            ) : repoCommits?.array.map((commit: any, index: number) =>
                                <div key={index}>
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