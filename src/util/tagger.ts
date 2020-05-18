// Tags a channel with a given id
export function tagC(id: string): string {
    return `<#${id}>`
}

// Tags the user with the given id
export function tagU(id: string): string {
    return `<@${id}>`
}

// Tags a role with the given id
export function tagR(id: string): string {
    return `<@&${id}>`
}
