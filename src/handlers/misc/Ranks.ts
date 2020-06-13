import AbstractHandler from '../abstract/AbstractHandler'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { Message } from 'discord.js'
import ranks, { IRank, LongestRankName } from '../../data/ranks'
import { findRangeEntity } from '../../util/rangeFinder'
import pluralize from '../../util/pluralize'

export default class RankHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(user: User, _cmd: Command, msg: Message): Promise<any> {
        let response = ''
        const currentRank = findRangeEntity(user.points, ranks) as IRank
        const currPoints = user.points
        if (currentRank.value === ranks.length - 1) {
            response = `congrats, you have ${pluralize(
                currPoints,
                'point'
            )} and have surpassed the final rank, ${currentRank.name}.\n\n`
        } else {
            const nextRank = ranks[currentRank.value + 1]
            const pointDiff = nextRank.lowerBound - currPoints
            response = `your current rank is ${currentRank.name}, and you are ${pluralize(
                pointDiff,
                'point'
            )} away from the next rank, ${nextRank.name}.\n\n`
        }

        response += 'Our existing tiers are as follow:\n```'

        const paddingSpaces = 4
        for (let rank of ranks) {
            // First part gets enough spaces to the end of longest rank
            const numSpaces = LongestRankName - rank.name.length + paddingSpaces
            // Add one since we're doing a join, which "removes" one space "element"
            const spaces = Array(numSpaces + 1).join(' ')
            const row = `${rank.name}${spaces}` + `${rank.lowerBound}-${rank.upperBound} points`
            response += `${row}\n`
        }
        response += '```'

        msg.reply(response)
    }
}
