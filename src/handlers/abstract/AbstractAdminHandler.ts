import AbstractHandler from './AbstractHandler'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { Message } from 'discord.js'

export default abstract class AbstractAdminHandler extends AbstractHandler {
    public async evaluate(user: User, cmd: Command, msg: Message): Promise<void> {
        if (user.isAdmin) {
            this.handler(user, cmd, msg)
        } else {
            msg.reply('nah u aint an admin')
        }
    }
}
