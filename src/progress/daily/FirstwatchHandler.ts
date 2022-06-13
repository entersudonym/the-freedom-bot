import { Message } from 'discord.js'
import config from '../../config/config'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { buildEmbed } from '../../util/embeds'
import { tagU } from '../../util/tagger'
import DefaultDiscipline from './DefaultDiscipline'
import moment = require('moment')

export default class FirstwatchHandler extends DefaultDiscipline {
    // 3:15 am
    EARLIEST_TIME_HOURS = 3
    EARLIST_TIME_MINS = 15
    // 5:30 am
    LATEST_TIME_HOURS = 5
    LATEST_TIME_MINS = 30

    protected async handler(user: User, cmd: Command, msg: Message) {
        if (!user.timeZone) {
            const embed = buildEmbed(
                msg,
                'E',
                'Timezone Required',
                msg.author.id,
                `you must set your timezone with *!timezone* command before using this command.`
            )
            return msg.channel.send(embed)
        }

        const tzNow = moment.tz(user.timeZone)
        const hours = tzNow.hours()
        const minutes = tzNow.minutes()

        let tooEarly: boolean = false
        let tooLate: boolean = false
        if (hours < this.EARLIEST_TIME_HOURS) {
            tooEarly = true
        } else if (hours === this.EARLIEST_TIME_HOURS && minutes < this.EARLIST_TIME_MINS) {
            tooEarly = true
        } else if (hours > this.LATEST_TIME_HOURS) {
            tooLate = true
        } else if (hours === this.LATEST_TIME_HOURS && minutes > this.LATEST_TIME_MINS) {
            tooLate = true
        }

        if (tooEarly) {
            const embed = buildEmbed(
                msg,
                'E',
                'Too Early',
                msg.author.id,
                `you can only claim points for waking up early after ${this.EARLIEST_TIME_HOURS}:${this.EARLIST_TIME_MINS}AM, since you might just be up late.`
            )
            return msg.channel.send(embed)
        }

        if (tooLate) {
            const embed = buildEmbed(
                msg,
                'E',
                'Too Late',
                msg.author.id,
                `you can only claim points for waking up early before ${this.LATEST_TIME_HOURS}:${this.LATEST_TIME_MINS}AM.`
            )
            return msg.channel.send(embed)
        }

        await super.handler(user, cmd, msg)
    }
}
