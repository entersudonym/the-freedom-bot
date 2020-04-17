import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractAdminHandler from '../abstract/AbstractAdminHandler'
import { Report } from '../../entity/Report'
import Invocations from '../../data/invocations'

export default class ViewStreakHandler extends AbstractAdminHandler {
    public constructor(requiresMention: true) {
        super(requiresMention)
    }

    protected async handler(_user: User, _cmd: Command, msg: Message): Promise<any> {
        // TODO: Figure out why ts-node doesn't like using the `first()` method on the collection
        //@ts-ignore
        const mentionedUser = msg.mentions.users.first()

        const user = await User.findOne({ discordId: mentionedUser.id })
        if (!user) {
            return msg.reply("couldn't find that user in the Freedom Bot database.")
        }

        // TODO: Do a more elegant join when querying for the last report.
        const command = await Command.findOne({ invocation: Invocations.SetDay })
        const lastReport = await Report.findOne({ user, command }, { order: { date: 'DESC' } })

        if (!lastReport) {
            return msg.reply(`${mentionedUser.username} hasn't yet set their day.`)
        } else {
            return msg.reply(
                `${mentionedUser.username} last recorded being on day ${lastReport.day}.`
            )
        }
    }
}
