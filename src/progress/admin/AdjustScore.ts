import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { Report } from '../../entity/Report'
import { parseNonZeroNumberFromString } from '../../util/parser'
import { tagU } from '../../util/tagger'
import pluralize from '../../util/pluralize'
import AbstractHandler from '../abstract/AbstractHandler'

export default class AdminAdjustScore extends AbstractHandler {
    public constructor() {
        // Like modify streak, we explicitly call rerank here (instead of in the parent) because this
        // operates over the tagged member, not the admin issuing the command.
        super(true, false, false, true)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        // TODO: Maybe figure out a way to make this mentionedUser part of the class declaration?
        // TODO: Figure out why ts-node doesn't like using the `first()` method on the collection
        //@ts-ignore
        const mentionedUser = msg.mentions.members.first()
        const taggedUser = await User.findOne({ discordId: mentionedUser.user.id })

        if (!taggedUser) {
            return msg.reply("couldn't find that user in the Freedom Bot database.")
        }

        const prevPoints = taggedUser.points
        const maybeNewPoints = parseNonZeroNumberFromString(msg.content, parseFloat)
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
            day: null,
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
            `successfully ${verb} ${pluralize(Math.abs(newPoints), 'point')} ${proposition} ${tagU(
                taggedUser.discordId
            )}'s account. They now have ${pluralize(taggedUser.points, 'point')}.`
        )
    }
}
