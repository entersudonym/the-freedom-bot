import { Client, Channel, GuildMember, Role } from 'discord.js'
import Collection from '@discordjs/collection'

// Various utilities to help work around the more annoying parts of the discord.js library

/**
 * Returns the channel with the ID `channelId` from `client`. Used to send message to a specific
 * channel that may be the channel from which a message originates.
 */
export function getChannelFromClient(client: Client, channelId: string): Channel {
    const channel = client.channels.resolve(channelId)
    if (!channel) throw new Error(`Channel with id ${channelId} could not be found.`)

    return channel
}

// Returns whether the given user has any of the roles, an array of roles
export function hasRole(user: GuildMember, roles: string[]): boolean {
    for (let role of roles) {
        if (user.roles.cache.has(role)) {
            return true
        }
    }

    return false
}

export function getRole(roles: Collection<string, Role>, target: string): Role {
    //@ts-ignore
    return roles.find(role => role.name === target)
}
