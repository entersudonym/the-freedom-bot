import handlers from '../handlers'
import AbstractHandler from '../abstract/AbstractHandler'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { Message } from 'discord.js'

export default class ListHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false)
    }

    // TODO: This really should be using `handlers`, as that's the canonical source of what we
    // support / don't support.
    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        const query = user.isAdmin ? {} : { isAdmin: true }
        const availableCommands = await Command.find(query)
        let reply = "here's a list of available commands.\n\n"

        for (let availableCommand of availableCommands) {
            reply += `**${availableCommand.name}**: !${availableCommand.invocation}\n`
            reply += `${availableCommand.description}\n\n`
        }

        return msg.reply(reply)
    }
}
