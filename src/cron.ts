// Not actual cron jobs, but just recurring tasks.
// They should go here.

import { Client, TextChannel } from 'discord.js'
import config from './config/config'
import { getChannelFromClient } from './util/discord'

const getMsFromReadableDates = ({
    seconds,
    minutes,
    hours,
    days,
}: {
    seconds?: number
    minutes?: number
    hours?: number
    days?: number
}) => {
    const msFromSeconds = (seconds || 0) * 1000
    const msFromMinutes = (minutes || 0) * 60 * 1000
    const msFromHours = (hours || 0) * 60 * 60 * 1000
    const msFromDays = (days || 0) * 24 * 60 * 60 * 1000

    return msFromSeconds + msFromMinutes + msFromHours + msFromDays
}

export const startBumpingServer = async (client: Client): Promise<void> => {
    const bumpSelf = (): void => {
        const bumpChannel = getChannelFromClient(client, config.channels.bump)
        ;(bumpChannel as TextChannel).send('!d bump')
    }

    bumpSelf()
    setTimeout(bumpSelf, getMsFromReadableDates({ hours: 2, seconds: 10 }))
}
