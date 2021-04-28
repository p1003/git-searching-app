import { FC, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useRepo, useRepoData } from "../../../API";
import { Paging } from "../../Paging"
import { ViewChanger } from '../../ViewChanger';
import { User } from "../User";
import styles from "./styles.module.css"
import sharedStyles from "../../../shared.module.css"

export const RepoView: FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxConPage, setMaxConPage] = useState(1);
    const [maxCommitPage, setMaxCommitPage] = useState(1);
    const [view, setView] = useState("Contributors");

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
        isLoading ? (
            <p className={sharedStyles.TitleB}>Loading...</p>
        ) : isError ? (
            <p className={sharedStyles.TitleB}>Error occured</p>
        ) : (
            <div className="RepoView">
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
                        <p className={sharedStyles.TitleB}>{repoData?.name}</p>
                        <Link className={sharedStyles.Link} to={`/${repoData?.owner.login}`}>View owner {repoData?.owner.login}</Link>
                    </div>
                    <ViewChanger setView={setView} view1="Contributors" view2="Commits" selectedView={view} />

                </div>
                {view === "Contributors" ?
                    <>
                        { isContributorsLoading ? (
                            <p className={sharedStyles.TitleB}>Loading...</p>
                        ) : isContributorsError ? (
                            <p className={sharedStyles.TitleB}>Error occured</p>
                        ) : repoContributors?.array.map((user: any, index: number) =>
                            <User user={user} index={index} key={index} />
                        )}
                        <Paging
                            currentPage={currentPage}
                            maxPage={maxConPage}
                            setCurrentPage={setCurrentPage} />
                    </>
                    : view === "Commits" &&
                    <>
                        { isCommitsLoading ? (
                            <p className={sharedStyles.TitleB}>Loading...</p>
                        ) : isCommitsError ? (
                            <p className={sharedStyles.TitleB}>Error occured</p>
                        ) : repoCommits?.array.map((commit: any, index: number) =>
                            <div key={index}
                                className={`${index % 2 === 0 ? sharedStyles.even : sharedStyles.odd} ${sharedStyles.resultBar}`}>
                                <div className={styles.commit_container}>
                                    <div className={styles.infoline}>
                                        <p className={sharedStyles.plaintext}>Author</p>
                                        <p className={sharedStyles.plaintext}>{commit.commit.author.name}</p>
                                    </div>
                                    <div className={styles.infoline}>
                                        <p className={sharedStyles.plaintext}>Message</p>
                                        <p className={sharedStyles.plaintext}>{commit.commit.message}</p>
                                    </div>
                                    <div className={styles.infoline}>
                                        <p className={sharedStyles.plaintext}>Date</p>
                                        <p className={sharedStyles.plaintext}>{commit.commit.author.date}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Paging
                            currentPage={currentPage}
                            maxPage={maxCommitPage}
                            setCurrentPage={setCurrentPage} />
                    </>

                }
            </div>
        )
    )
}