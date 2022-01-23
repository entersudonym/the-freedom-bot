import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { Report } from '../../entity/Report'
import { User } from '../../entity/User'
import AbstractDayHandler from '../abstract/AbstractDayHandler'
import { getLastSetDay } from '../../util/db'
import moment = require('moment')
import { tagR } from '../../util/tagger'
import { MiscServerRoles } from '../../data/roles'
import pluralize from '../../util/pluralize'

export default class SetDayHandler extends AbstractDayHandler {
    public constructor() {
        super(false, true, false, false)
    }

    /**
     * Creates a Report and updates the users' points for setting their day. Returns the new number
     * of points a user has.
     * @param day the day that the user is trying to set
     * @param points the number of points that should be awarded for setting `day`
     */
    private async addReportAndUpdateUser(
        user: User,
        command: Command,
        day: number,
        points: number,
    ): Promise<number> {
        await Report.create({
            user,
            points,
            day,
            command,
            isRegression: false,
        }).save()

        user.points += points
        await user.save()

        return user.points
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const content = msg.content
        const dayString = content.substr(content.lastIndexOf(' ') + 1)
        const day = parseInt(dayString)

        if (isNaN(day) || day < 0) {
            // Invalid day (parsing-wise)
            return msg.reply(`${dayString} is an invalid day. Try a whole number instead.`)
        }

        const lastSetDay = await getLastSetDay(user)

        if (!lastSetDay) {
            // User is setting their day for the first time
            if (day > 0) {
                return msg.reply(
                    'Welcome to the Freedom Academy! Since you are beginning your journey with us, please set your NoFap day to 0.',
                )
            }

            // Returns total points, but we don't need to display that when days are first set to 0
            await this.addReportAndUpdateUser(user, cmd, day, day)
            if (day === 0) {
                return msg.reply(`your day has been set to 0. Get excited to make some progress!`)
            }
        }

        // User has set day before. Verify that it's ascending.
        const lastDay = lastSetDay.day
        if (lastDay >= day) {
            return msg.reply(
                `your last-recorded day is ${lastDay}. You must !relapse or set something higher.`,
            )
        }

        // Verify that the date isn't wildly more than it's supposed to be.
        const desiredNewDays = day - lastDay
        const actualElapsedDays = moment().diff(moment(lastSetDay.date), 'days')
        if (desiredNewDays > actualElapsedDays + 2) {
            const mod = MiscServerRoles.Moderator
            return msg.reply(
                `you should be at around day ${
                    lastDay + actualElapsedDays
                }, so you can't set yourself to day ${day}. Contact a ${tagR(
                    mod,
                )} if you need assistance.`,
            )
        }

        const newPoints = day - lastDay // guaranteed to be positive
        const totalPoints = await this.addReportAndUpdateUser(user, cmd, day, newPoints)
        await this.rerankStreaks(msg.member, lastDay, day)

        return msg.reply(
            `congrats on reaching day ${day}. You earned ${pluralize(
                newPoints,
                'point',
                'new',
            )} and now have ${pluralize(totalPoints, 'point')} total.`,
        )
    }
}
