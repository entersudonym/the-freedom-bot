import AbstractHandler from './AbstractHandler'
import { GuildMember } from 'discord.js'
import { findRangeEntity } from '../../util/rangeFinder'
import streaks from '../../data/streaks'
import { getRole } from '../../util/discord'

export default abstract class AbstractDayHandler extends AbstractHandler {
    protected async rerankStreaks(member: GuildMember, prevDay: number, newDay: number) {
        const oldFlair = findRangeEntity(prevDay, streaks)
        const newFlair = findRangeEntity(newDay, streaks)

        if (oldFlair.name !== newFlair.name) {
            const roles = member.guild.roles.cache
            const oldFlairRole = getRole(roles, oldFlair.name)
            const newFlairRole = getRole(roles, newFlair.name)

            await member.roles.remove(oldFlairRole)
            await member.roles.add(newFlairRole)
        }
    }
}
