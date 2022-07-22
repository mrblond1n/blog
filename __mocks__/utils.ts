export const makeIndex = <T>(arr: T & {id: string}[]): {[id: string]: T} =>
    arr.reduce((acc, curr) => ({...acc, [curr.id]: curr}), {});
