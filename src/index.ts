import * as Discord from 'discord.js'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from './config/config'
import { handleMessage } from './handlers/ingress'
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

        // TODO: Record messages from gratitude/affirmations/journal channels
    })

    client.on('guildMemberAdd', member => {
        // TODO: Send them an introduction message!
    })

    client.on('guildMemberRemove', member => {
        // TODO: Send the admin channel a notification!
    })
})
