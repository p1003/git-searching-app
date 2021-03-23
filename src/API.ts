// import { useQuery } from "react-query";

// export const RequestUserRepos = (username: string) =>
//     useQuery<{name : string}[]>(
//         ["repo", username],
//         async () => {
//             const response = await fetch(
//                 `https://api.github.com/users/${username}/repos`
//             );
//             if (!response.ok) {
//                 throw new Error('Sth went wrong')
//             }
//             return response.json();
//         },
//         {
//             enabled: false,
//             keepPreviousData: true
//         }
//     );

// export const RequestUser = (username : string) =>
//     useQuery<{name : string}>(
//         ["repo", username],
//         async () => {
//             const response = await fetch(
//                 `https://api.github.com/users/${username}`
//             );
//             if (!response.ok) {
//                 throw new Error('Sth went wrong')
//             }
//             return response.json();
//         },
//         {
//             enabled: false,
//             keepPreviousData: true
//         }
//     );

// export const RequestRepo = (repoName : string) =>
//     useQuery<{name : string}>(
//         ["repo", repoName],
//         async () => {
//             const response = await fetch(
//                 `https://api.github.com/repos/${repoName}`
//             );
//             if (!response.ok) {
//                 throw new Error('Sth went wrong')
//             }
//             return response.json();
//         },
//         {
//             enabled: false,
//             keepPreviousData: true
//         }
//     );

export async function requestUserRepos(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    // console.log(data);
    return data;
}

export async function requestUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    return data;
}

export async function requestRepo(username : string, repoName: string) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const data = await response.json();
    // console.log(data);
    return data;
}