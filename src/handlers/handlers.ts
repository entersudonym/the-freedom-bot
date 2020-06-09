import AbstractHandler from './abstract/AbstractHandler'
import DefaultDiscipline from './daily/DefaultDiscipline'
import SetDayHandler from './daily/SetDayHandler'
import AdminViewScoreHandler from './admin/ViewScore'
import { Invocations, InfoInvocations, AliasInvocations } from '../data/invocations'
import AdminViewStreakHandler from './admin/ViewStreak'
import GetDayHandler from './misc/GetDay'
import GetScoreHandler from './misc/GetScore'
import RegressionHandler from './misc/Regression'
import EmergencyHandler from './misc/Emergency'
import LeaderboardHandler from './misc/Leaderboard'
import ListHandler from './misc/List'
import AdminAdjustScore from './admin/AdjustScore'
import TimeZoneHandler from './misc/TimeZone'
import AdminModifyStreak from './admin/SetStreak'

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
handlers.set(InfoInvocations.List, new ListHandler())
handlers.set(InfoInvocations.GetDay, new GetDayHandler())
handlers.set(InfoInvocations.GetScore, new GetScoreHandler())
handlers.set(InfoInvocations.AdminViewScore, new AdminViewScoreHandler())
handlers.set(InfoInvocations.AdminViewStreak, new AdminViewStreakHandler())
handlers.set(InfoInvocations.AdminAdjustScore, new AdminAdjustScore())
handlers.set(InfoInvocations.AdminSetStreak, new AdminModifyStreak())
handlers.set(InfoInvocations.Emergency, new EmergencyHandler())
handlers.set(InfoInvocations.Timezone, new TimeZoneHandler())

export default handlers
