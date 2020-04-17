import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractAdminHandler from '../abstract/AbstractAdminHandler'
import { Report } from '../../entity/Report'

export default class ViewScoreHandler extends AbstractAdminHandler {
    protected async handler(user: User, cmd: Command, msg: Message): Promise<void> {
        //
    }
}
