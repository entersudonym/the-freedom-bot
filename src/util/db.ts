import { User } from '../entity/User'
import { Command } from '../entity/Command'
import { Invocations } from '../data/invocations'
import { Report } from '../entity/Report'

export async function getLastSetDay(user: User) {
    // TODO: We need a better way of accessing this command. Maybe a cache layer?
    const command = await Command.findOne({ invocation: Invocations.SetDay })
    return await Report.findOne({ user, command }, { order: { date: 'DESC' } })
}
