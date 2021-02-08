import { Message, GuildMemberRoleManager, MessageEmbed } from 'discord.js'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'
import { Command } from '../../entity/Command'
import { buildEmbed } from "../../util/embeds"
import config from '../../config/config'
import ranks from '../../data/ranks'

export default class RoleHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const userRoles: GuildMemberRoleManager = await msg.member.roles
        const raconteur = config.roles.raconteur
        const janissaryLowerbound = ranks[4].lowerBound
        let roleAssigned = false

        if(await user.points < janissaryLowerbound){    //Checks if the user is on Janissary or above
            const embed : MessageEmbed = buildEmbed('E', 
            "Failed to assign role",
            msg.author.id,
            "You must be on Janissary rank or above in order to get this role.")
            return msg.channel.send(embed)
        }

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
