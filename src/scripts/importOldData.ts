import { User } from '../entity/User'
import { Report } from '../entity/Report'
import { Command } from '../entity/Command'
import { Invocations } from '../data/invocations'
import { createConnection } from 'typeorm'
const dump = require('../data/data')

type UserType = [number, number, number, string]
const DISCORD_INDEX = 0
const STREAK_INDEX = 1
const SCORE_INDEX = 2
const DATE_INDEX = 3

const personData: UserType[] = dump['values']
createConnection().then(async connection => {
    const setDayCommand = await Command.findOne({ invocation: Invocations.SetDay })
    if (!setDayCommand) {
        console.log('No set day command was found. Exiting.')
        connection.close()
        return
    }

    for (let person of personData) {
        const discordId = String(person[DISCORD_INDEX])
        const streak = person[STREAK_INDEX]
        const score = person[SCORE_INDEX]
        const lastSetStreak = person[DATE_INDEX]

        const user = await User.create({ discordId, points: score }).save()
        const setStreak = await Report.create({
            user,
            command: setDayCommand,
            points: score,
            date: lastSetStreak !== null ? new Date(lastSetStreak) : new Date(),
            day: streak,
            isRegression: streak === 0,
        }).save()
        console.log(`Created new set day report for ${discordId} with day ${setStreak.day}`)
    }

    console.log('Done!')
    connection.close()
})
