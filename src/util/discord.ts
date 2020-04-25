import { Client, Channel, GuildMember } from 'discord.js'

// Various utilities to help work around the more annoying parts of the discord.js library

export function getChannelFromClient(client: Client, channelId: string): Channel {
    const channel = client.channels.resolve(channelId)
    if (!channel) throw new Error(`New comers channel ${channelId} could not be found.`)

    return channel
}

// Returns whether the given user has any of the roles, an array of role Snowflakes
export function hasRole(user: GuildMember, roles: string[]) {
    for (let role of roles) {
        if (user.roles.cache.has(role)) {
            return true
        }
    }

    return false
}
