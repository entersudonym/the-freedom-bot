import AbstractHandler from './AbstractHandler'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { Message } from 'discord.js'

export default abstract class AbstractAdminHandler extends AbstractHandler {
    public constructor(protected requiresMention: boolean) {
        super()
    }

    public async evaluate(user: User, cmd: Command, msg: Message): Promise<any> {
        if (user.isAdmin) {
            if (this.requiresMention) {
                const mentionedUsers = msg.mentions.users

                if (mentionedUsers.size === 0) {
                    return msg.reply('you must mention the user on whom to run this command.')
                }

                if (mentionedUsers.size > 1) {
                    return msg.reply('you can only mention one user at a time.')
                }
            }

            this.handler(user, cmd, msg)
        } else {
            msg.reply('that command is reserved solely for admins.')
        }
    }
}
