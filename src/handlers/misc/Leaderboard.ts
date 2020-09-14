import { Message, GuildMember } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'

export default class LeaderboardHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const users = await User.find({ order: { points: 'DESC' } })

        let result = 'The users with a non-zero number of points are listed below.\n\n'
        for (let i = 0; i < users.length; i++) {
            const currUser = users[i]
            let discordUser: GuildMember
            try {
                discordUser = await msg.guild.members.fetch(currUser.discordId)
            } catch (e) {
                continue
            }
            if (currUser.points === 0) {
                // Don't list the user if they have 0 points
                continue
            }
            let toPush = `${i + 1}. ${discordUser.user.username} ⇆ ${currUser.points}`

            if (user.discordId === currUser.discordId) {
                toPush = `**${toPush}**`
            }

            result += `${toPush}\n`
        }

        // Substring just in case this gets too long
        // TODO(entersudonym): Be smarter about this. Paginate!
        return msg.channel.send(result.substr(0, 1999))
    }
}
