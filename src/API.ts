import { useQuery } from "react-query";

const headers = {
    "Authorization": `Token ed5617c5f612dedc2781890bd03b24da46a11a3e`
}

export const useUserRepos = (username: string) =>
    useQuery<{ name: string }[]>(
        ["repo", username],
        async () => {
            if (username != "") {
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} repos`)
                }
                return response.json();
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
            if (username != "") {
                const response = await fetch(
                    `https://api.github.com/users/${username}`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} user`)
                }
                return response.json();
            }
        },
        {
            keepPreviousData: true
        }
    );

export const useRepo = (username: string, repoName: string) =>
    useQuery<{ name: string }>(["repo", username, repoName],
        async () => {
            if (username != "" && repoName != "") {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repoName}`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load repo ${repoName} of ${username}`)
                }
                console.log(response.json())
                return response.json();
            }
        },
        {
            keepPreviousData: true
        }
    );