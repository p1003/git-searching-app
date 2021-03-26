import { useQuery } from "react-query";

const headers = {
    "Authorization": `Token ${process.env.REACT_APP_GIT_AUTH_TOKEN}`,
    "Accept" : "application/vnd.github.cloak-preview"
}

export const useUserRepos = (username: string) =>
    useQuery<{ name: string }[]>(
        ["repos", username],
        async () => {
            if (username !== "") {
                // https://api.github.com/users/${username}/repos
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=user:${username}`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} repos`)
                }
                const data = await response.json();
                console.log(response.headers.get("link"))
                console.log(data);
                return data.items;
            }
        },
        {
            keepPreviousData: true
        }
    );

export const useUser = (username: string) =>
    useQuery<{ login: string }>(
        ["user", username],
        async () => {
            if (username !== "") {
                const response = await fetch(
                    `https://api.github.com/users/${username}`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} user`)
                }
                const data = await response.json();
                console.log(data);
                return data.items;
            }
        },
        {
            keepPreviousData: true
        }
    );

export const useRepo = (username: string, repoName: string) =>
    useQuery<{ name: string }>(["repo", username, repoName],
        async () => {
            if (repoName !== "") {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repoName}`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load repo ${repoName}`)
                }
                const data = await response.json();
                console.log(data)
                return data;
            }
        },
        {
            keepPreviousData: true
        }
    );

export const useRepoContributors = (username: string, repoName: string) =>
    useQuery<{ name: string }[]>(
        ["collabs", username, repoName],
        async () => {
            if (username !== "" && repoName !== "") {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repoName}/contributors`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} repos`)
                }
                const data = await response.json();
                console.log(data)
                return data;
            }
        },
        {
            keepPreviousData: true
        }
    );

export const useRepoCommits = (username: string, repoName: string) =>
    useQuery<{ name: string }[]>(
        ["commits", username, repoName],
        async () => {
            if (username !== "" && repoName !== "") {
                // `https://api.github.com/repos/${username}/${repoName}/commits`
                // `https://api.github.com/search/commits?q=repo:${repoName}`
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repoName}/commits`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} repos`)
                }
                const data = await response.json();
                console.log(data)
                return data;
            }
        },
        {
            keepPreviousData: true
        }
    );