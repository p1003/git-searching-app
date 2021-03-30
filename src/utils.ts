export const sortValues = [
    "interactions",
    "reactions",
    "author-date",
    "commiter-date",
    "updated"];

export const orderValues = [
    "asc",
    "desc"];

export const PAGES_RANGE = 3;
export const DEFAULT_PER_PAGE = 30;
export const MAX_PER_PAGE = 100;

export type Options = {
    page: number;
    perPage: number;
    sort: string;
    order: string;
    stars: string;
    forks: string;
    followers: string;
}

export function checkNumSearch(value: string): string {
    let result = "";
    const searches = value.replace(" ","").split(",");
    searches.forEach(option => {
        if (option.substr(0, 1) === "<" || option.substr(0, 1) === ">") {
            const number = parseInt(option.substr(1));
        } else {
            const numbers = value.split("..");
            if (numbers.length == 2) {
                return false;
            }
        }
    })
    return result;
}