import { User } from '../entity/User'
import { Command } from '../entity/Command'
import { Invocations } from '../data/invocations'
import { Report } from '../entity/Report'
import { FindConditions } from 'typeorm'

// forRegression specifies whether to get the last set day that was a regression or not
export async function getLastSetDay(user: User, forRegression?: boolean): Promise<Report> {
    // TODO: We need a better way of accessing this command. Maybe a cache layer?
    const command = await Command.findOne({ invocation: Invocations.SetDay })
    const baseQuery: FindConditions<Report> = { user, command }
    const query: FindConditions<Report> = forRegression
        ? { ...baseQuery, isRegression: true }
        : baseQuery
    return await Report.findOne(query, { order: { date: 'DESC' } })
}

export async function getLastReport(user: User, command: Command) {
    return (await Report.findOne({ user, command }, { order: { date: 'DESC' } })) || null
}

export async function getCommands(includeAdmin: boolean): Promise<Command[]> {
    const adminQuery = includeAdmin ? {} : { isAdmin: false }
    return await Command.find({
        ...adminQuery,
    })
}
