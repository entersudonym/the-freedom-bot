/**
 * When the output of this function is sent to Discord, it will be rendered as a clickable channel.
 * (Note: you can find a channel's id by looking at the last part of the pathname when you're on
 * that channel.)
 * @param id the channel id to tag
 */
export function tagC(id: string): string {
    return `<#${id}>`
}

/**
 * When the output of this function is sent to Discord, it will render as a clickable user. However,
 * it will not tag the user if used in an embed. To find a user's id, you can send a message where
 * you tag them, prepend a backslash to the message, and then send the message.
 * @param id the id of the user to render
 */
export function tagU(id: string): string {
    return `<@${id}>`
}

// Tags a role, given its ID
export function tagR(id: string): string {
    return `<@&${id}>`
}
