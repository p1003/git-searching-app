import { useQuery } from "react-query";

const headers = {
    "Authorization": `Token ${process.env.REACT_APP_GIT_AUTH_TOKEN}`,
    "Accept": "application/vnd.github.cloak-preview"
}

// https://api.github.com/search/repositories?q=door-manager&page=1

export const useSearch = (
    searchInput: string,
    searchType: string,
    page: number,
    perPage: number,
    sort: string,
    setMaxPage: (page: number) => void) =>
    useQuery(
        [searchType, searchInput, page],
        async () => {
            if (searchInput !== "" && searchType !== "") {
                let url = `https://api.github.com/search/${searchType}?q=${searchInput}`;
                if (page > 0) {
                    url += `&page=${page}`;
                }
                if (perPage > 1 && perPage < 101 && perPage !== 30) {
                    url += `&per_page=${perPage}`;
                }
                let order = sort;
                if (sort !== "") {
                    url += `&sort=${sort}`;
                    if (order !== "") {
                        url += `&order=${order}`;
                    }
                }
                console.log("url: " + url)
                const response = await fetch(
                    url, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load search for ${searchInput}`)
                }
                const data = await response.json();
                console.log(response.headers.get("link"))
                console.log(data);
                setMaxPage(Math.ceil(data.total_count / 30));
                return data;
            }
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
                return data;
            }
        },
        {
            keepPreviousData: true
        }
    );

export const useUserData = (username: string, type: string) =>
    useQuery<{ name: string }[]>(
        [type , username],
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

export const useRepo = (username: string, repoName: string) =>
    useQuery<{ name: string }>(
        ["repo", username, repoName],
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

export const useRepoData = (username: string, repoName: string, type: string) =>
    useQuery<{ name: string }[]>(
        [type, username, repoName],
        async () => {
            if (username !== "" && repoName !== "") {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repoName}/${type}`, {
                    "method": "GET",
                    "headers": headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to load ${username} ${type}`)
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