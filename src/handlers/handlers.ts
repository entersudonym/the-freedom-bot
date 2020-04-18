import AbstractHandler from './abstract/AbstractHandler'
import DefaultDiscipline from './daily/DefaultDiscipline'
import SetDayHandler from './daily/SetDayHandler'
import ViewScoreHandler from './admin/ViewScore'
import { Invocations, InfoInvocations } from '../data/invocations'
import ViewStreakHandler from './admin/ViewStreak'
import GetDayHandler from './misc/GetDay'
import GetScoreHandler from './misc/GetScore'
import RegressionHandler from './misc/Regression'
import EmergencyHandler from './misc/Emergency'
import LeaderboardHandler from './misc/Leaderboard'

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
handlers.set(Invocations.SetDay, new SetDayHandler())

handlers.set(InfoInvocations.Relapse, new RegressionHandler())
handlers.set(InfoInvocations.Leaderboard, new LeaderboardHandler())
handlers.set(InfoInvocations.GetDay, new GetDayHandler())
handlers.set(InfoInvocations.GetScore, new GetScoreHandler())
handlers.set(InfoInvocations.AdminViewScore, new ViewScoreHandler())
handlers.set(InfoInvocations.AdminViewStreak, new ViewStreakHandler())
handlers.set(InfoInvocations.Emergency, new EmergencyHandler())

export default handlers
