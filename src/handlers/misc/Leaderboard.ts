import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'

export default class LeaderboardHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        msg.channel.startTyping()

        const users = await User.find({ order: { points: 'DESC' } })

        let result = ''
        for (let i = 0; i < users.length; i++) {
            const currUser = users[i]
            const discordUser = await msg.guild.members.fetch(currUser.discordId)
            let toPush = `${i + 1}. ${discordUser.user.username} ⇆ ${currUser.points}`

            if (user.discordId === currUser.discordId) {
                toPush = `**${toPush}**`
            }

            result += `${toPush}\n`
        }

        msg.channel.stopTyping()
        return msg.channel.send(result)
    }
}
