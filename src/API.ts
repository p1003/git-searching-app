import { useQuery } from "react-query";
import { DEFAULT_PER_PAGE, MAX_PER_PAGE } from "./utils"

const headers = {
    "Authorization": `Token ${process.env.REACT_APP_GIT_AUTH_TOKEN}`,
    "Accept": "application/vnd.github.cloak-preview"
}

export const useSearch = (
    searchInput: string,
    searchType: string,
    page: number,
    perPage: number,
    sort: string,
    order: string,
    stars: string,
    forks: string,
    followers: string,
    setMaxPage: (page: number) => void) =>
    useQuery(
        [searchType, searchInput, page, perPage, sort, order],
        async () => {
            let url = `https://api.github.com/search/${searchType}?q=${searchInput}`;
            if (stars !== "") {
                const starList = stars.split(",");
                // url += `&stars%3A${starList[0]}`;
                for (var i = 0; i < starList.length; i++) {
                    url += `+stars%3A${starList[i]}`;
                }
            }
            if (forks !== "") {
                const forkList = forks.split(",");
                // if (stars !== "") {
                //     url += `+forks%3A${forks}`;
                // } else {
                //     url += `&forks%3A${forks}`;
                // }
                for (var i = 0; i < forkList.length; i++) {
                    url += `+forks%3A${forkList[i]}`;
                }
            }
            if (page > 0) {
                url += `&page=${page}`;
            }
            if (perPage > 1 && perPage <= MAX_PER_PAGE && perPage !== DEFAULT_PER_PAGE) {
                url += `&per_page=${perPage}`;
            }
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
            console.log(data);
            setMaxPage(Math.ceil(data.total_count / perPage));
            return data;
        },
        {
            enabled: searchInput !== "" && searchType !== ""
        }
    );

export const useUser = (username: string) =>
    useQuery<{ login: string, avatar_url: string, public_repos: number, followers: number }>(
        ["user", username],
        async () => {
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
        },
        {
            enabled: username !== "",
            keepPreviousData: true
        }
    );

export const useUserData = (username: string, type: string, page: number) =>
    useQuery<{ name: string }[]>(
        [type, username, page],
        async () => {
            // https://api.github.com/users/apohllo/repos
            const response = await fetch(
                `https://api.github.com/users/${username}/${type}?page=${page}`, {
                "method": "GET",
                "headers": headers
            });
            if (!response.ok) {
                throw new Error(`Failed to load ${username} repos`)
            }
            const data = await response.json();
            console.log(data);
            return data;

        },
        {
            enabled: username !== "",
            keepPreviousData: true
        }
    );

export const useRepo = (username: string, repoName: string) =>
    useQuery<{ name: string, owner: any }>(
        ["repo", username, repoName],
        async () => {
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
        },
        {
            enabled: username !== "" && repoName !== "",
            keepPreviousData: true
        }
    );

export const useRepoData = (username: string, repoName: string, type: string, page: number) =>
    useQuery<{ pages: number | null, array: { name: string }[] }>(
        [type, username, repoName, page],
        async () => {
            const response = await fetch(
                `https://api.github.com/repos/${username}/${repoName}/${type}?page=${page}`, {
                "method": "GET",
                "headers": headers
            });
            if (!response.ok) {
                throw new Error(`Failed to load ${username} ${type}`)
            }
            const data = await response.json();
            const head = response.headers.get("link");
            console.log(head);
            const num = head && parseInt(head.split(",")[1].replace(">", "").split(";")[0].split("=")[1]) || null
            return { array: data, pages: num };

        },
        {
            enabled: username !== "" && repoName !== "",
            keepPreviousData: true
        }
    );

export const useFetch = (url_to_fetch: string) =>
    useQuery(
        [url_to_fetch],
        async () => {
            const response = await fetch(
                url_to_fetch, {
                "method": "GET",
                "headers": headers
            });
            if (!response.ok) {
                throw new Error(`Failed to load ${url_to_fetch}`);
            }
            const data = await response.json();
            // console.log(data);
            return data;
        }
    )