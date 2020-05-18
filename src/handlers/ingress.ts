import { Message } from 'discord.js'
import { InfoInvocations, Invocations, AliasMapping } from '../data/invocations'
import { MiscServerRoles } from '../data/roles'
import { Command } from '../entity/Command'
import { User } from '../entity/User'
import { createUser } from '../scripts/users'
import { getLastSetDay } from '../util/db'
import { hasRole } from '../util/discord'
import { sendSuggestions } from '../util/embeds'
import { findSimilarCommands } from '../util/suggest'
import handlers from './handlers'

export async function handleMessage(msg: Message) {
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
        const similarCommands = await findSimilarCommands(invocation, 3, user.isAdmin)
        return msg.channel.send(sendSuggestions(similarCommands))
    }

    const lastSetDay = await getLastSetDay(user)
    if (invocation !== Invocations.SetDay && !lastSetDay) {
        return msg.reply(
            `you need to set your day first using the **!${Invocations.SetDay} <day>** command.`
        )
    }

    const cmd = await getCommandFromInvocation(invocation)
    await handler.evaluate(user, cmd, msg)
}

function getInvocationFromMessage(input: string): string {
    const withoutExclamation = input.substring(1)
    return withoutExclamation.split(' ')[0]
}

async function getCommandFromInvocation(invocation: string): Promise<Command | null> {
    // A relapse is really just a SetDay back to 0 with additional consequences. Its implemented
    // like a SetDay at the database level, but sets the user's rank/points back some more. That's
    // why the associated command is a SetDay but its Handler is a RegressionHandler.
    const setDayAliases: string[] = [InfoInvocations.Relapse, InfoInvocations.AdminModifyStreak]
    if (setDayAliases.includes(invocation)) {
        invocation = Invocations.SetDay
    }

    // This will throw if the command isn't found. Should be caught in index.
    return await Command.findOneOrFail({ invocation })
}
