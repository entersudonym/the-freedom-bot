import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'
import { InfoInvocations } from '../../data/invocations'
import moment = require('moment-timezone')

export default class TimeZoneHandler extends AbstractHandler {
    private readonly ZoneChart = 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'

    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const content = msg.content
        const lastSpaceIndex = content.lastIndexOf(' ')
        const timeZone = content.substr(lastSpaceIndex + 1)

        if (lastSpaceIndex === -1 || timeZone.length === 0) {
            return msg.reply(
                `to set your timezone, type **!${InfoInvocations.Timezone} <time_zone>**, using the "TZ database name" from ${this.ZoneChart}.`
            )
        }

        const isValid = moment.tz.zone(timeZone) !== null
        if (!isValid) {
            return msg.reply(`${timeZone} is an invalid timezone.`)
        }

        user.timeZone = timeZone
        await user.save()

        return msg.reply(`successfully set your timezone to ${timeZone}.`)
    }
}
