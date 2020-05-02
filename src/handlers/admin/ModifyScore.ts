import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractAdminHandler from '../abstract/AbstractAdminHandler'
import { Report } from '../../entity/Report'
import { parseNonZeroTrailingFloatFromString } from '../../util/parser'
import { tagU } from '../../util/tagger'

export default class AdminModifyScore extends AbstractAdminHandler {
    public constructor() {
        // Reranking handled inside here because the reranking happens on the tagged member, not the
        // person invoking the command.
        super(true, false, false, true)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        // TODO: Figure out why ts-node doesn't like using the `first()` method on the collection
        //@ts-ignore
        const mentionedUser = msg.mentions.members.first()
        const taggedUser = await User.findOne({ discordId: mentionedUser.user.id })

        if (!taggedUser) {
            return msg.reply("couldn't find that user in the Freedom Bot database.")
        }

        const prevPoints = taggedUser.points
        const maybeNewPoints = parseNonZeroTrailingFloatFromString(msg.content)
        if (maybeNewPoints.error) {
            return msg.reply(maybeNewPoints.error)
        }
        const newPoints = maybeNewPoints.number

        await Report.create({
            user: taggedUser,
            adminCreator: user,
            command: cmd,
            points: newPoints,
            isRegression: false,
            day: null
        }).save()
        taggedUser.points += newPoints
        await taggedUser.save()

        let verb = '',
            proposition = ''
        if (newPoints > 0) {
            verb = 'added'
            proposition = 'to'
        } else {
            // Invariant that scoreDiff !== 0 because the parser would reject that
            verb = 'removed'
            proposition = 'from'
        }

        await this.rerank(mentionedUser, prevPoints, taggedUser.points)
        return msg.reply(
            `successfully ${verb} ${newPoints} point(s) ${proposition} ${tagU(
                taggedUser.discordId
            )}'s account. They now have ${taggedUser.points} point(s).`
        )
    }
}
