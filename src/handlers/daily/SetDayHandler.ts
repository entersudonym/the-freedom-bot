import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { Report } from '../../entity/Report'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'

export default class SetDayHandler extends AbstractHandler {
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
        points: number
    ): Promise<number> {
        await Report.create({
            user,
            points,
            day,
            command,
            isRegression: false
        }).save()

        user.points += points
        await user.save()

        return user.points
    }

    protected async handler(user: User, cmd: Command, msg: Message): Promise<any> {
        const content = msg.content
        const dayString = content.substr(content.lastIndexOf(' ') + 1)
        const day = parseInt(dayString)

        // TODO: Allow people to set day to 0?
        if (isNaN(day) || day < 0) {
            // Invalid day (parsing-wise)
            return msg.reply(`${dayString} is an invalid day. Try a whole number instead.`)
        }

        const lastSetDay = await Report.findOne({ user, command: cmd }, { order: { date: 'DESC' } })

        if (!lastSetDay) {
            // User is setting their day for the first time
            const totalPoints = await this.addReportAndUpdateUser(user, cmd, day, day)
            return msg.reply(
                `good job on setting your day for the first time. You now have ${totalPoints} points.`
            )
        }

        // User has set day before. Verify that it's ascending.
        const lastDay = lastSetDay.day
        if (lastDay >= day) {
            return msg.reply(
                `your last-recorded day is ${lastDay}. You must !relapse or set something higher.`
            )
        }

        // TODO: Verify that the user's day is not wildly more than what its supposed to be.
        const newPoints = day - lastDay // guaranteed to be positive
        const totalPoints = await this.addReportAndUpdateUser(user, cmd, day, newPoints)
        return msg.reply(
            `congrats on reaching day ${day}. You earned ${newPoints} new point(s) and now have ${totalPoints} points total.`
        )
    }
}
