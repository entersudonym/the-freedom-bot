import { MessageEmbed, MessagePayload, Message, ColorResolvable } from 'discord.js'
import { tagU } from './tagger'
import { Command } from '../entity/Command'

const SUCCESS_COLOR = '#2ecc71' // green
const ERROR_COLOR = '#e74c3c' // red
const INFO_COLOR = '#3498db' // blue

/**
 * Builds an embed using the specified parameters. This function is most likely
 * to be used if we need to send simple (but pretty!) responses to users about
 * the output of commands they ran.
 * @param status the success status of the message: success, error, or info.
 * @param title the title of the embed
 * @param id the id of the user to tag in the embed
 * @param description the description to follow the user tag
 */
export function buildEmbed(
    msg: Message,
    status: 'S' | 'I' | 'E',
    title: string,
    id: string,
    description: string
): MessagePayload {
    let color: ColorResolvable = 'DEFAULT'
    switch (status) {
        case 'S':
            color = 'GREEN'
            break
        case 'I':
            color = 'BLUE'
            break
        case 'E':
            color = 'RED'
    }

    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(`${tagU(id)}, ${description}`)

    return new MessagePayload(msg, { embeds: [embed] })
}

export function successReply(msg: Message, title: string, description: string) {
    return msg.channel.send(buildEmbed(msg, 'S', title, msg.author.id, description))
}

export function infoReply(msg: Message, title: string, description: string) {
    return msg.channel.send(buildEmbed(msg, 'I', title, msg.author.id, description))
}

export function errorReply(msg: Message, title: string, description: string) {
    return msg.channel.send(buildEmbed(msg, 'E', title, msg.author.id, description))
}

/**
 * Renders a list of valid commands as a list of fields in an embed. This
 * function is called when no matching CommandHandler can be found, which
 * happens at the top-level (i.e. index.ts).
 * @param suggestions a list of valid commands
 */
export function sendSuggestions(msg: Message, suggestions: Command[]): MessagePayload {
    let description = suggestions.length === 0 ? '' : 'Here are some similar commands: '
    let baseEmbed = new MessageEmbed()
        .setColor(INFO_COLOR)
        .setTitle('No command found')
        .setDescription(description)

    for (let suggestion of suggestions) {
        baseEmbed.addField(`!${suggestion.invocation}`, suggestion.description)
    }

    return new MessagePayload(msg, { embeds: [baseEmbed] })
}

/**
 * This function is the essence of the list command. Right now, it just renders
 * the daily commands, but as a TODO, it should be extended to include all the
 * available bot commands.
 */
// export function listCommands(title: string, commands: Command[]): MessageEmbed {
//     let baseEmbed = new MessageEmbed().setColor(INFO_COLOR).setTitle(title)

//     for (let command of commands) {
//         baseEmbed.addField(command.invocation, command.description)
//     }

//     return baseEmbed
// }
