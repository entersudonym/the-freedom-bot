import { Message, GuildMemberRoleManager, MessageEmbed } from 'discord.js'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'
import { Command } from '../../entity/Command'
import { buildEmbed } from "../../util/embeds"
import config from '../../config/config'

export default class RoleHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const userRoles: GuildMemberRoleManager = await msg.member.roles
        const raconteur = config.roles.raconteur
        let roleAssigned = false

        if (await userRoles.cache.has(raconteur)) {
            await userRoles.remove(raconteur)
        } else {
            await userRoles.add(raconteur)
            roleAssigned = true
        }

        const embed : MessageEmbed = buildEmbed('I', 
            roleAssigned? "Role Assigned" : "Role Removed",
            msg.author.id,
            roleAssigned? "You have been given the Raconteur role" : "Your Raconteur role has been removed")
        return msg.channel.send(embed)
    }
}
