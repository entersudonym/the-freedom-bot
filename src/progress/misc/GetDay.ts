import { Message } from 'discord.js'
import { Invocations } from '../../data/invocations'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { getLastSetDay } from '../../util/db'
import AbstractHandler from '../abstract/AbstractHandler'
import moment = require('moment')

export default class GetDayHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const lastSetDay = await getLastSetDay(user)

        if (!lastSetDay) {
            return msg.reply(
                `you haven't set your day yet. Set it with **${Invocations.SetDay} <day>** to do so.`
            )
        }

        const dateString = moment(lastSetDay.date).fromNow()
        return msg.reply(`your last recorded day was day ${lastSetDay.day} (set ${dateString}).`)
    }
}
