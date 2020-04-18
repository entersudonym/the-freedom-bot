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
const DailyDisciplineHandler = new DefaultDiscipline()
handlers.set(Invocations.Affirmation, DailyDisciplineHandler)
handlers.set(Invocations.ColdShower, DailyDisciplineHandler)
handlers.set(Invocations.Gratefulness, DailyDisciplineHandler)
handlers.set(Invocations.MakeBed, DailyDisciplineHandler)
handlers.set(Invocations.Meditation, DailyDisciplineHandler)
handlers.set(Invocations.Workout, DailyDisciplineHandler)
// TODO: Verify that people sent a message in journals!
handlers.set(Invocations.Journal, DailyDisciplineHandler)

// TODO: Make non-report invocations part of an InfoInvocation enum
handlers.set(Invocations.SetDay, new SetDayHandler())
handlers.set(Invocations.Relapse, new RegressionHandler())
handlers.set(Invocations.GetDay, new GetDayHandler())
handlers.set(Invocations.GetScore, new GetScoreHandler())

handlers.set(Invocations.AdminViewScore, new ViewScoreHandler())
handlers.set(Invocations.AdminViewStreak, new ViewStreakHandler())

export default handlers
