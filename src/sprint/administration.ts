// Starts the sprint for the upcoming month. Fails if it is not inn the last 7 days of the current

import moment = require('moment')
import config from '../config/config'
import { Sprint } from '../entity/Sprint'
import { BasicServiceResponse } from './types'

// month. Will not start a sprint if there is one in progress.
export const startSprint = async (): Promise<BasicServiceResponse> => {
    // Get the current date and make sure that it's within 7 days before the end of the month
    // See if there are any ongoing sprints currently
    let existingSprint = Sprint.findOne({ active: true })
    const daysLeftInMonth = moment().startOf('day').diff(moment().endOf('month'), 'days')

    if (daysLeftInMonth > config.sprints.startBuffer) {
        return {
            ok: false,
            msg: `Must start a sprint within ${config.sprints.startBuffer} days of the end of the month.`,
        }
    }

    if (await existingSprint) {
        return { ok: false, msg: 'Cannot start a new sprint while one already exists.' }
    }

    const sprintMonth = moment().add({ month: 1 })
    const sprintMonthIndex = sprintMonth.get('month')
    const sprintYearIndex = sprintMonth.get('year')

    // TODO: maybe handle an error here?
    await Sprint.create({ active: true, month: sprintMonthIndex, year: sprintYearIndex })
    return { ok: true, msg: 'Successfully created new sprint' }
}

// Ends the current sprint.
export const endSprint = async (): Promise<BasicServiceResponse> => {
    // TODO: fetch based on current month and such
    await Sprint.update({ active: true }, { active: false })
    return { ok: true, msg: 'Successfully ended sprint' }
}
