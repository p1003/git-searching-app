import { useQuery } from "react-query";

export const RequestUserRepos = (username: string) =>
    useQuery<{name : string}[]>(
        ["repo", username],
        async () => {
          const response = await fetch(
            `https://api.github.com/users/${username}/repos`
          );
          const json = await response.json();
          return json;
        },
        {
            enabled: false,
            keepPreviousData: true
        }
    );

export const RequestUser = (username : string) =>
    useQuery<{name : string}>(
        ["repo", username],
        async () => {
          const response = await fetch(
            `https://api.github.com/users/${username}`
          );
          const json = await response.json();
          return json;
        },
        {
            enabled: false,
            keepPreviousData: true
        }
    );

export const RequestRepo = (repoName : string) =>
    useQuery<{name : string}>(
        ["repo", repoName],
        async () => {
            const response = await fetch(
                `https://api.github.com/repos/${repoName}`
            );
            const json = await response.json();
            return json;
        },
        {
            enabled: false,
            keepPreviousData: true
        }
    );