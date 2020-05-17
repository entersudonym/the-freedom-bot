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
        newPoints: number
    ): Promise<void> {
        // TODO: Write a custom handler for this!
        await super.rerank(discordUser, prevPoints, newPoints)
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        // Guaranteed to exist because you can't use the bot without first setting day
        const lastSetDay = await getLastSetDay(user)
        const lastDay = lastSetDay.day

        const currRank = findRangeEntity(user.points, ranks) as IRank
        let nextRankValue: number
        if (moment(lastDay).diff(moment(), 'days') >= 7) {
            // Not a binge.
            nextRankValue = Math.max(currRank.value - 1, 0)
        } else {
            // Binge
            nextRankValue = Math.max(currRank.value - 3, 0)
        }
        const nextRank = findRankFromValue(nextRankValue)

        const existingPoints = user.points
        const pointsToRemove = existingPoints - nextRank.lowerBound

        await Report.create({
            user,
            command: cmd,
            isRegression: true,
            day: 0,
            points: -pointsToRemove
        }).save()

        user.points = user.points - pointsToRemove
        await user.save()

        await this.rerankStreaks(msg.member, lastDay, 0)
        // TODO(N): Show them something inspirational.
        // Probably want to make a module that will fetch a URL from the NoFap website. Take a peek
        // at Emergency.ts to see how we do it.
        // TODO: Write a message formatter that deals with formatting floating points/embeds.
        return msg.reply(
            `your relapse has been recorded. You lost ${pluralize(
                pointsToRemove,
                'point'
            )} and now have ${pluralize(user.points, 'point')}.`
        )
    }
}
