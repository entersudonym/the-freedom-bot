import { Message, GuildMemberRoleManager } from 'discord.js'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'
import { Command } from '../../entity/Command'

export default class RoleHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const userRoles: GuildMemberRoleManager = await msg.member.roles
        const raconteur = '799498542641053726' // this should refer to the role in config.ts 0_0
        let confirmation = 'Something went wrong' // In case the if-else somehow fails (not likely)

        if (await userRoles.cache.has(raconteur)) {
            await userRoles.remove(raconteur)
            confirmation = 'The role Raconteur has been removed'
        } else {
            await userRoles.add(raconteur)
            confirmation = 'You have been assigned the Raconteur role'
        }

        return msg.channel.send(confirmation)
    }
}
