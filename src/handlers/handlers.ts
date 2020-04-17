import AbstractHandler from './abstract/AbstractHandler'
import DefaultDiscipline from './daily/DefaultDiscipline'
import SetDayHandler from './daily/SetDayHandler'
import ViewScoreHandler from './admin/ViewScore'
import Invocations from '../data/invocations'
import ViewStreakHandler from './admin/ViewStreak'
import GetDayHandler from './misc/GetDay'
import GetScoreHandler from './misc/GetScore'
import RegressionHandler from './misc/Regression'

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

handlers.set(Invocations.Relapse, new RegressionHandler())
handlers.set(Invocations.GetDay, new GetDayHandler())
handlers.set(Invocations.GetScore, new GetScoreHandler())

handlers.set(Invocations.AdminViewScore, new ViewScoreHandler(true))
handlers.set(Invocations.AdminViewStreak, new ViewStreakHandler(true))

export default handlers
