import { Message } from 'discord.js'
import { Command } from '../entity/Command'
import { User } from '../entity/User'
import { createUser } from '../scripts/users'
import handlers from './handlers'
import { Invocations, InfoInvocations } from '../data/invocations'
import { getLastSetDay } from '../util/db'
import { MiscServerRoles } from '../data/roles'
import { hasRole } from '../util/discord'

export async function handleMessage(msg: Message) {
    if (!shouldRespond(msg)) return

    // Get user or create one if it doesn't exist
    const authorId = msg.author.id
    let user = await User.findOne({ discordId: authorId })
    if (!user) {
        const isAdmin = hasRole(msg.member, [
            MiscServerRoles.Moderator,
            MiscServerRoles.Executive,
            MiscServerRoles.Owner
        ])
        user = await createUser(authorId, isAdmin)
    }

    // Get the appropriate handler, instantiate it, and run an evaluation
    const invocation = getInvocationFromMessage(msg.content)

    const handler = handlers.get(invocation)
    if (!handler) {
        // TODO: Smart suggest some things that they might have intended to write.
        return msg.reply('command not found.')
    }

    const lastSetDay = await getLastSetDay(user)
    if (invocation !== Invocations.SetDay && !lastSetDay) {
        return msg.reply(
            `you need to set your day first using the **!${Invocations.SetDay} <day>** command.`
        )
    }

    const cmd = await getCommandFromInvocation(invocation)
    handler.evaluate(user, cmd, msg)
}

function shouldRespond(msg: Message) {
    return msg.content.startsWith('!')
}

function getInvocationFromMessage(input: string): string {
    const withoutExclamation = input.substring(1)
    return withoutExclamation.split(' ')[0]
}

async function getCommandFromInvocation(invocation: string): Promise<Command | null> {
    // A relapse is really just a SetDay back to 0 with additional consequences. Its implemented
    // like a SetDay at the database level, but sets the user's rank/points back some more. That's
    // why the associated command is a SetDay but its Handler is a RegressionHandler.
    if (invocation === InfoInvocations.Relapse) invocation = Invocations.SetDay

    if (Object.values(Invocations).includes(invocation)) {
        return await Command.findOne({ invocation })
    } else {
        return null
    }
}
