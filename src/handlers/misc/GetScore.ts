import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'

export default class GetScoreHandler extends AbstractHandler {
    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const points = user.points
        return msg.reply(`you have ${points} point(s).`)
    }
}
