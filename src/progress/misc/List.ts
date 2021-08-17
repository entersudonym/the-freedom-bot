import handlers from '../handlers'
import AbstractHandler from '../abstract/AbstractHandler'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { Message } from 'discord.js'
import { In } from 'typeorm'
import { isAdmin } from '../../util/permissions'

export default class ListHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const isUserAdmin = isAdmin(msg.member)
        const supportedInvocations = Array.from(handlers.keys())
        const adminQuery = isUserAdmin ? {} : { isAdmin: false }
        const availableCommands = await Command.find({
            invocation: In(supportedInvocations),
            ...adminQuery,
        })

        let sections = {
            daily: '**Daily Disciplines**\n',
            misc: '**Miscellaneous Commands**\n',
            admin: isUserAdmin ? '**Admin Commands**\n' : '',
        }
        for (let availableCommand of availableCommands) {
            let row = `__${availableCommand.name}__ (!${availableCommand.invocation}): ${availableCommand.description}\n`
            if (availableCommand.isDaily) sections.daily += row
            else if (availableCommand.isAdmin) sections.admin += row
            else sections.misc += row
        }

        // Split so that we don't go over the 2000 character limit
        let firstPart = `Here's a list of available commands.\n\n`
        firstPart += sections.daily
        let secondPart = sections.misc + sections.admin

        msg.channel.send(firstPart)
        return msg.channel.send(secondPart)
    }
}
