import { Client, Intents, TextChannel, User as DiscordUser } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes, InteractionType } from 'discord-api-types/v9'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from './config/config'
import { handleProgressMessage } from './progress/ingress'
import { getExitMessage, getWelcomeMessage } from './data/messages'
import { getChannelFromClient } from './util/discord'
import { tagR } from './util/tagger'
import { MiscServerRoles } from './data/roles'
import { Command } from './entity/Command'

const client = new Client({ intents: new Intents(Intents.FLAGS.GUILD_MEMBERS) })
const restClient = new REST({ version: '9' }).setToken(config.key)

// Initializes the connection to Discord and the database
async function init() {
    await createConnection()
    // Ensure that there are commands in the database
    const [commands, numCommands] = await Command.findAndCount()
    if (!numCommands) {
        console.error('No commands found! Did you populate yet?')
        process.exit(1)
    }

    const slashCommandsBody = commands
        .map((c) => new SlashCommandBuilder().setName(c.invocation).setDescription(c.description))
        .map((sc) => sc.toJSON())

    await client.login(config.key)

    try {
        await restClient.put(Routes.applicationGuildCommands(config.appId, config.guildId), {
            body: slashCommandsBody,
        })
        console.log('Sucessfully registered application commands')
    } catch (e) {
        console.error(e)
    }
}

init().then(async () => {
    console.log('Discord and database initialization complete')

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand()) return
        console.log(interaction)
    })

    client.on('message', async (msg) => {
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
})
