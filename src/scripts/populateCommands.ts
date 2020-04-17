import { createConnection } from 'typeorm'
import commands from '../data/commands'
import { Command } from '../entity/Command'

createConnection().then(async connection => {
    let promises = []
    for (let command of commands) {
        const existing = await Command.findOne({ invocation: command.invocation })

        if (existing) {
            // Only update name, description, and point value. Other properties rarely change so we
            // won't even let that happen (for safety purposes).
            existing.name = command.name
            existing.description = command.description
            existing.points = command.points
            promises.push(existing.save())
        } else {
            // Command doesn't already exist, so we create it.
            promises.push(Command.create(command).save())
        }
    }

    try {
        await Promise.all(promises)
        console.log(`Successfully created/updated ${promises.length} commands!`)
        connection.close()
    } catch (e) {
        console.error(`There was an error creating/updating commands: ${e}`)
    }
})
