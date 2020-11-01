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
        console.log('\n\n-------------------------------')
        console.log(`Processing relapse for discordId ${user.discordId}, userId is ${user.id}`)

        let dayDiff = -1
        if (lastRelapse) {
            dayDiff = moment().diff(moment(lastRelapse.date), 'days')
            console.log(
                `Last relapse recorded at ${lastRelapse.date}, days since then is ${dayDiff}. Was it a regression: ${lastRelapse.isRegression}`,
            )
        } else {
            console.log('No last relapse on file.')
        }

        console.log('!lastRelapse: ', !lastRelapse)
        console.log('dayDiff >= 7: ', dayDiff >= 7)
        if (!lastRelapse || dayDiff >= 7) {
            console.log('Reducing rank by just 1.')
            nextRankValue = Math.max(currRank.value - 1, 0)
        } else {
            // Binge
            console.log('Reducing rank by half.')
            nextRankValue = Math.floor(currRank.value / 2)
        }
        const nextRank = findRankFromValue(nextRankValue)
        console.log(`Next rank will be: ${nextRank.name}`)

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
        // TODO(N): Show them something inspirational.
        // Probably want to make a module that will fetch a URL from the NoFap website. Take a peek
        // at Emergency.ts to see how we do it.
        // TODO: Write a message formatter that deals with formatting floating points/embeds.
        return msg.reply(
            `your relapse has been recorded. You lost ${pluralize(
                pointsToRemove,
                'point',
            )} and now have ${pluralize(user.points, 'point')}.`,
        )
    }
}
