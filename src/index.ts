import * as Discord from 'discord.js'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from './config/config'
import { handleMessage } from './handlers/ingress'
const client = new Discord.Client()

// Initializes the connection to Discord and the database
async function init() {
    await createConnection()
    await client.login(config.discord.key)
}

init().then(async () => {
    console.log('Discord and database initialization complete')

    client.on('message', msg => {
        handleMessage(msg)
    })
})
