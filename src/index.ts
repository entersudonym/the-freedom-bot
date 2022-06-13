import { Client, Intents, TextChannel, User as DiscordUser } from 'discord.js'
import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import config from './config/config'
import { handleProgressMessage } from './progress/ingress'
import { getExitMessage, getWelcomeMessage } from './data/messages'
import { getChannelFromClient } from './util/discord'
import { tagR } from './util/tagger'
import { MiscServerRoles } from './data/roles'
import { Command } from './entity/Command'

const client = new Client({
    intents:
        Intents.FLAGS.GUILD_MESSAGES |
        Intents.FLAGS.GUILDS |
        Intents.FLAGS.GUILD_MEMBERS |
        Intents.FLAGS.GUILD_PRESENCES,
})
let dbConnection: Connection | undefined

run()

// Runs the bot by initializing the connections to Discord and the database, and starting to listen
// to events.
async function run() {
    await init()

    console.log('Discord and database initialization complete')

    client.on('messageCreate', async (msg) => {
        if (msg.author.bot) return

        try {
            if (
                msg.content.startsWith('!') &&
                msg.channel.id === config.channels.progressReporting
            ) {
                await handleProgressMessage(msg)
            }
        } catch (e) {
            msg.channel.send(
                `There was an error with the bot. The ${tagR(
                    MiscServerRoles.TechGuy
                )}s have been notified. Please temporarily refrain from running commands.`
            )

            const context = `**${msg.author.username}** tried to run **${msg.content}**\n\n`

            const botChannel = getChannelFromClient(client, config.channels.botTalk)
            ;(botChannel as unknown as TextChannel).send(context + e)
        }
    })

    client.on('guildMemberAdd', (member) => {
        const channel = getChannelFromClient(client, config.channels.newComers)
        ;(channel as unknown as TextChannel).send(
            getWelcomeMessage((member.user as DiscordUser).id)
        )
    })

    client.on('guildMemberRemove', async (member) => {
        // TODO(entersudonym): Remove the user from the database, and all associated data.
        const channel = getChannelFromClient(client, config.channels.exit)
        ;(channel as unknown as TextChannel).send(
            getExitMessage((member.user as DiscordUser).username)
        )
    })
}

// Initializes the connection to Discord and the database
async function init() {
    if (!dbConnection?.isConnected) {
        dbConnection = await createConnection()
    }
    client.login(config.key)

    // Ensure that there are commands in the database
    const [_, numCommands] = await Command.findAndCount()
    if (!numCommands) {
        console.error('No commands found! Did you populate yet?')
        process.exit(1)
    }
}
