import { Message } from 'discord.js'
import Invocations from '../../data/invocations'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { getLastSetDay } from '../../util/db'
import AbstractHandler from '../abstract/AbstractHandler'

export default class GetDayHandler extends AbstractHandler {
    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const lastSetDay = await getLastSetDay(user)

        if (!lastSetDay) {
            return msg.reply(
                `you haven't set your day yet. Set it with **${Invocations.SetDay} <day>** to do so.`
            )
        }

        // TODO: Include the date on which the last set-day was.
        return msg.reply(`your last recorded day was day ${lastSetDay.day}`)
    }
}
