import { Client, Channel } from 'discord.js'

// Various utilities to help work around the more annoying parts of the discord.js library

export function getChannelFromClient(client: Client, channelId: string): Channel {
    const channel = client.channels.resolve(channelId)
    if (!channel) throw new Error(`New comers channel ${channelId} could not be found.`)

    return channel
}
