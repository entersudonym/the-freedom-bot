import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import { GuildMember } from 'discord.js'
import AbstractDayHandler from '../abstract/AbstractDayHandler'
import { Report } from '../../entity/Report'
import { getLastSetDay } from '../../util/db'
import moment = require('moment')
import { findRankFromValue, findRangeEntity } from '../../util/rangeFinder'
import ranks, { IRank } from '../../data/ranks'
import pluralize from '../../util/pluralize'

export default class RegressionHandler extends AbstractDayHandler {
    public constructor() {
        super(false, true, false, false)
    }

    protected async rerank(
        discordUser: GuildMember,
        prevPoints: number,
        newPoints: number,
    ): Promise<void> {
        // TODO: Write a custom handler for this!
        await super.rerank(discordUser, prevPoints, newPoints)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const currRank = findRangeEntity(user.points, ranks) as IRank
        const lastSetDay = await getLastSetDay(user)
        const lastRelapse = await getLastSetDay(user, true)

        let nextRankValue: number

        let dayDiff = -1
        if (lastRelapse) {
            dayDiff = moment().diff(moment(lastRelapse.date), 'days')
        }

        if (!lastRelapse || dayDiff >= 7) {
            nextRankValue = Math.max(currRank.value - 1, 0)
        } else {
            // Binge
            nextRankValue = Math.floor(currRank.value / 2)
        }
        const nextRank = findRankFromValue(nextRankValue)

        const existingPoints = user.points
        const pointsToRemove = existingPoints - nextRank.lowerBound

        await Report.create({
            user,
            command: cmd,
            isRegression: true,
            day: 0,
            points: -pointsToRemove,
        }).save()

        user.points = user.points - pointsToRemove
        await user.save()

        await this.rerankStreaks(msg.member, lastSetDay.day, 0)

        return msg.reply(
            `your relapse has been recorded. You lost ${pluralize(
                pointsToRemove,
                'point',
            )} and now have ${pluralize(user.points, 'point')}`,
        )
    }
}
