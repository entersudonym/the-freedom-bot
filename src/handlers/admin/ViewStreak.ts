import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { getLastSetDay } from '../../util/db'
import AbstractAdminHandler from '../abstract/AbstractAdminHandler'

export default class ViewStreakHandler extends AbstractAdminHandler {
    public constructor() {
        super(false, true)
    }

    protected async handler(_user: User, _cmd: Command, msg: Message): Promise<any> {
        // TODO: Figure out why ts-node doesn't like using the `first()` method on the collection
        //@ts-ignore
        const mentionedUser = msg.mentions.users.first()

        const user = await User.findOne({ discordId: mentionedUser.id })
        if (!user) {
            return msg.reply("couldn't find that user in the Freedom Bot database.")
        }

        const lastSetDay = await getLastSetDay(user)
        if (!lastSetDay) {
            return msg.reply(`${mentionedUser.username} hasn't yet set their day.`)
        } else {
            return msg.reply(
                `${mentionedUser.username} last recorded being on day ${lastSetDay.day}.`
            )
        }
    }
}
