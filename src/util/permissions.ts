import { hasRole } from '../util/discord'
import { GuildMember } from 'discord.js'
import { MiscServerRoles } from '../data/roles'

export function isAdmin(user: GuildMember): boolean {
    return hasRole(user, [
        MiscServerRoles.Moderator,
        MiscServerRoles.Executive,
        MiscServerRoles.Owner,
    ])
}
