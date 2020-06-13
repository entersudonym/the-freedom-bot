import { hasRole } from '../../build/util/discord'
import { GuildMember } from 'discord.js'
import { MiscServerRoles } from '../../build/data/roles'

export function isAdmin(user: GuildMember): boolean {
    return hasRole(user, [
        MiscServerRoles.Moderator,
        MiscServerRoles.Executive,
        MiscServerRoles.Owner,
    ])
}
