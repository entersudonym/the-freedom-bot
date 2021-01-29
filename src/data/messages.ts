import config from '../config/config'
import { tagC, tagU } from '../util/tagger'

/**
 * Creates the introduction message for a new user who joins the server.
 * @param id the discord ID of the user who just joined
 */
export function getWelcomeMessage(id: string) {
    return `Welcome to the Freedom Academy, ${tagU(id)}. Please read the ${tagC(
        config.channels.rules,
    )} channel and familiarize yourself with the performance standards of this server. Once you have read the material, post your introduction here, and a Moderator will assign you your first rank.`
}

/**
 * Creates the message for the admin channel when someone leaves the server.
 * @param username the username of the user who just left
 */
export function getExitMessage(username: string) {
    return `${username} just left the server.`
}
