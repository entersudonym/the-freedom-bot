import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractAdminHandler from '../abstract/AbstractAdminHandler'
import { Report } from '../../entity/Report'
import { parseNonZeroNumberFromString } from '../../util/parser'
import { tagU } from '../../util/tagger'
import pluralize from '../../util/pluralize'
import { getLastSetDay } from '../../util/db'

export default class AdminModifyStreak extends AbstractAdminHandler {
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
        const maybeNewDay = parseNonZeroNumberFromString(msg.content, parseInt)
        if (maybeNewDay.error) {
            return msg.reply(maybeNewDay.error)
        }
        const newDay = maybeNewDay.number
        const pointValue = newDay - (await getLastSetDay(taggedUser)).day

        await Report.create({
            user: taggedUser,
            adminCreator: user,
            command: cmd,
            points: pointValue,
            isRegression: false,
            day: newDay
        }).save()
        taggedUser.points += pointValue
        await taggedUser.save()

        let verb = ''
        if (pointValue >= 0) {
            verb = 'gained'
        } else {
            verb = 'lost'
        }

        await this.rerank(mentionedUser, prevPoints, taggedUser.points)
        return msg.reply(
            `successfully set ${tagU(taggedUser.discordId)}'s streak to ${pluralize(
                newDay,
                'day'
            )}. They ${verb} ${pluralize(pointValue, 'point')} and now have ${taggedUser.points}.`
        )
    }
}
