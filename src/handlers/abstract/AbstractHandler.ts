import { Message } from 'discord.js'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'

export default abstract class AbstractHandler {
    public constructor() {}

    protected abstract async handler(user: User, cmd: Command, msg: Message): Promise<void>

    public async evaluate(user: User, cmd: Command, msg: Message): Promise<void> {
        this.handler(user, cmd, msg)
    }
}
