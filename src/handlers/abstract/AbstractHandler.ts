import { Message, TextChannel } from 'discord.js'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { GuildMember } from 'discord.js'
import { findRangeEntity } from '../../util/rangeFinder'
import Ranks, { IRank } from '../../data/ranks'
import { getChannelFromClient } from '../../util/discord'
import config from '../../config/config'
import { tagU } from '../../util/tagger'
import { Report } from '../../entity/Report'
import { getLastReport } from '../../util/db'
import moment = require('moment-timezone')

export default abstract class AbstractHandler {
    /**
     *
     * @param shouldRerank whether or not the AbstractHandler should rerank the user after the
     * concrete handler runs
     * @param ensureDayElapsed whether or not to check that the last time the command was run was
     * more than 24 hours ago.
     * @param verifyMention whether or not the AbstractHandler should ensure that the message
     * contains a mention.
     */
    public constructor(
        protected shouldRerank: boolean,
        protected ensureDayElapsed: boolean,
        protected verifyMention: boolean
    ) {}

    protected abstract async handler(user: User, cmd: Command, msg: Message): Promise<void>

    protected async rerank(
        discordUser: GuildMember,
        prevPoints: number,
        newPoints: number
    ): Promise<void> {
        const prevRank = findRangeEntity(prevPoints, Ranks) as IRank
        const newRank = findRangeEntity(newPoints, Ranks) as IRank

        if (prevRank.name !== newRank.name) {
            // TODO(1): Role stuff needs to be fixed!
            // const rolesToRemove = await discordUser.guild.roles.fetch(prevRank.name)
            // await discordUser.roles.remove([rolesToRemove])
            // await discordUser.roles.add(await discordUser.guild.roles.fetch(newRank.name))

            const mainChat = getChannelFromClient(discordUser.client, config.channels.mainChat)
            if (newRank.value > prevRank.value) {
                // They've leveled up
                ;(mainChat as TextChannel).send(
                    `Good news! ${tagU(discordUser.user.username)} leveled up to ${
                        newRank.name
                    } from ${prevRank.name}.`
                )
            } else {
                // TODO: We shouldn't get here. This message should be handled by the Regression handler.
                // Right now, we'll only get here for a Regression, but this should be fixed.
                ;(mainChat as TextChannel).send(
                    `Looks like ${tagU(discordUser.user.username)} leveled down from ${
                        prevRank.name
                    } to ${newRank.name} due to a relapse. Send some words of encouragement!`
                )
            }
        }
    }

    protected hasDayElapsed(user: User, report: Report | null): boolean {
        if (report === null) return true

        const timeZone = user.timeZone ? user.timeZone : 'UTC'
        const now = moment().tz(timeZone)
        const lastDate = moment(report.date).tz(timeZone)

        return !now.isSame(lastDate, 'day')
    }

    public async evaluate(user: User, cmd: Command, msg: Message): Promise<any> {
        if (this.ensureDayElapsed) {
            const lastReport = await getLastReport(user, cmd)

            if (!this.hasDayElapsed(user, lastReport)) {
                // TODO: Show timezone command and/or say how much time to wait.
                return msg.reply("you've already run that command for today.")
            }
        }

        if (this.verifyMention) {
            const mentionedUsers = msg.mentions.users

            if (mentionedUsers.size === 0) {
                return msg.reply('you must mention the user on whom to run this command.')
            }

            if (mentionedUsers.size > 1) {
                return msg.reply('you can only mention one user at a time.')
            }
        }

        const prevPoints = user.points
        await this.handler(user, cmd, msg)

        if (this.shouldRerank) {
            console.log('reranking')
            console.log(prevPoints, user.points)
            this.rerank(msg.member, prevPoints, user.points)
        }
    }
}
