import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'
import { Report } from '../../entity/Report'
import pluralize from '../../util/pluralize'
import { buildEmbed } from '../../util/embeds'

export default class DefaultDiscipline extends AbstractHandler {
    public constructor() {
        // Always re-rank for daily disciplines, and never check for mentions.
        super(false, true, true, false)
    }
    protected async handler(user: User, cmd: Command, msg: Message) {
        const pointsToAward = cmd.points

        await Report.create({
            user: user,
            command: cmd,
            points: pointsToAward,
            isRegression: false,
            day: null
        }).save()

        user.points = user.points + pointsToAward
        await user.save()

        const embed = buildEmbed(
            'S',
            `${cmd.altName || cmd.name} Recorded`,
            msg.author.id,
            `successfully added ${pluralize(
                pointsToAward,
                'point'
            )} to your account. You now have ${pluralize(user.points, 'point')}.`
        )

        return msg.channel.send(embed)
    }
}
