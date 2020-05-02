import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'

export default class AdminViewScoreHandler extends AbstractHandler {
    public constructor() {
        super(true, false, false, true)
    }

    protected async handler(_user: User, _cmd: Command, msg: Message): Promise<any> {
        // TODO: Figure out why ts-node doesn't like using the `first()` method on the collection
        //@ts-ignore
        const mentionedUser = msg.mentions.users.first()
        const user = await User.findOne({ discordId: mentionedUser.id })

        if (!user) {
            return msg.reply("couldn't find that user in the Freedom Bot database.")
        }

        return msg.reply(`${mentionedUser.username} has ${user.points} point(s).`)
    }
}
