import AbstractHandler from './abstract/AbstractHandler'
import DefaultDiscipline from './daily/DefaultDiscipline'
import SetDayHandler from './daily/SetDayHandler'
import Invocations from '../data/invocations'

const handlers: Map<string, AbstractHandler> = new Map()

// Daily disciplines that can all be handled in a default way
handlers.set(Invocations.Affirmation, new DefaultDiscipline())
handlers.set(Invocations.ColdShower, new DefaultDiscipline())
handlers.set(Invocations.Gratefulness, new DefaultDiscipline())
handlers.set(Invocations.MakeBed, new DefaultDiscipline())
handlers.set(Invocations.Meditation, new DefaultDiscipline())
handlers.set(Invocations.Workout, new DefaultDiscipline())

handlers.set(Invocations.SetDay, new SetDayHandler())
// TODO: Verify that people sent a message in journals!
handlers.set(Invocations.Journal, new DefaultDiscipline())

export default handlers
