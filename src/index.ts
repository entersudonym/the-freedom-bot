import * as Discord from 'discord.js'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from './config/config'
import { handleMessage } from './handlers/ingress'
import { getExitMessage, getWelcomeMessage } from './data/messages'
import { getChannelFromClient } from './util/discord'
const client = new Discord.Client()

// Initializes the connection to Discord and the database
async function init() {
    await createConnection()
    await client.login(config.key)
}

init().then(async () => {
    console.log('Discord and database initialization complete')

    client.on('message', msg => {
        if (msg.channel.id === config.channels.progressReporting) {
            return handleMessage(msg)
        }

        // TODO(2): Record messages from gratitude/affirmations/journal channels
    })

    client.on('guildMemberAdd', member => {
        const channel = getChannelFromClient(client, config.channels.newComers)
        ;(channel as Discord.TextChannel).send(getWelcomeMessage((member.user as Discord.User).id))
    })

    client.on('guildMemberRemove', async member => {
        const channel = getChannelFromClient(client, config.channels.adminChannel)
        ;(channel as Discord.TextChannel).send(getExitMessage((member.user as Discord.User).id))
    })
})
