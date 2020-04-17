import { Message } from 'discord.js'
import { Command } from '../entity/Command'
import { User } from '../entity/User'
import { createUser } from '../scripts/users'
import handlers from './handlers'

export async function handleMessage(msg: Message) {
    if (!shouldRespond(msg)) return

    // Get user or create one if it doesn't exist
    const authorId = msg.author.id
    let user = await User.findOne({ discordId: authorId })
    if (!user) {
        // TODO: Make those with Moderator/Executive roles automatically an admin
        user = await createUser(authorId)
    }

    // TODO: Ensure that they have set their day

    // Get the appropriate handler, instantiate it, and run an evaluation
    const invocation = getInvocationFromMessage(msg.content)

    const handler = handlers.get(invocation)
    if (!handler) {
        // TODO: Smart suggest some things that they might have intended to write.
        return msg.reply('command not found.')
    }

    const cmd = await Command.findOne({ invocation })
    handler.evaluate(user, cmd, msg)
}

function shouldRespond(msg: Message) {
    return msg.content.startsWith('!')
}

function getInvocationFromMessage(input: string): string {
    const withoutExclamation = input.substring(1)
    return withoutExclamation.split(' ')[0]
}
