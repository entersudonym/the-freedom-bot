import { Message, GuildMember } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { updateName } from '../../util/updateName'
import AbstractHandler from '../abstract/AbstractHandler'

let exp_date: Date

export default class LeaderboardHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const users = await User.find({ order: { points: 'DESC' } })

        let result = ''
        const expired = this.hasExpired()
        for (let i = 0; i < users.length; i++) {
            const currUser = users[i]

            if (expired) {
                let discordUser: GuildMember

                try {
                    discordUser = await msg.guild.members.fetch(currUser.discordId)

                    const username = await discordUser.user.username

                    await updateName(currUser.discordId, username)
                } catch (e) {
                    continue
                }
            }

            let toPush = `${i + 1}. ${currUser.username} ⇆ ${currUser.points}`

            if (user.discordId === currUser.discordId) {
                toPush = `**${toPush}**`
            }

            result += `${toPush}\n`
        }

        return msg.channel.send(result)
    }

    private hasExpired(): boolean {
        const date = new Date()

        if (date > exp_date || date == undefined) {
            date.setDate(date.getDate() + 15)

            exp_date = date

            return true
        }

        return false
    }
}
