export async function requestUserRepos(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    console.log(data);
    return data;
}

export async function requestUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    return data;
}