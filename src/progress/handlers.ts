import { InfoInvocations, Invocations } from '../data/invocations'
import AbstractHandler from './abstract/AbstractHandler'
import AdminAdjustScore from './admin/AdjustScore'
import AdminModifyStreak from './admin/SetStreak'
import AdminViewScoreHandler from './admin/ViewScore'
import AdminViewStreakHandler from './admin/ViewStreak'
import DefaultDiscipline from './daily/DefaultDiscipline'
import FirstwatchHandler from './daily/FirstwatchHandler'
import ReportedDisciplineHandler from './daily/ReportedHandler'
import SetDayHandler from './daily/SetDayHandler'
import EmergencyHandler from './misc/Emergency'
import GetDayHandler from './misc/GetDay'
import GetScoreHandler from './misc/GetScore'
import LeaderboardHandler from './misc/Leaderboard'
import ListHandler from './misc/List'
import RankHandler from './misc/Ranks'
import RegressionHandler from './misc/Regression'
import TimeZoneHandler from './misc/TimeZone'

const handlers: Map<string, AbstractHandler> = new Map()

// Daily disciplines that can all be handled in a default way
const DailyDisciplineHandler = new DefaultDiscipline()
handlers.set(Invocations.Affirmation, DailyDisciplineHandler)
handlers.set(Invocations.ColdShower, DailyDisciplineHandler)
handlers.set(Invocations.MakeBed, DailyDisciplineHandler)
handlers.set(Invocations.Meditation, DailyDisciplineHandler)
handlers.set(Invocations.Workout, DailyDisciplineHandler)
// TODO: Verify that people sent a message in journals!
handlers.set(Invocations.Journal, new ReportedDisciplineHandler())
handlers.set(Invocations.Gratefulness, new ReportedDisciplineHandler())
handlers.set(Invocations.Firstwatch, new FirstwatchHandler())
handlers.set(Invocations.SetDay, new SetDayHandler())

handlers.set(InfoInvocations.Relapse, new RegressionHandler())
handlers.set(InfoInvocations.Leaderboard, new LeaderboardHandler())
handlers.set(InfoInvocations.List, new ListHandler())
handlers.set(InfoInvocations.Ranks, new RankHandler())
handlers.set(InfoInvocations.GetDay, new GetDayHandler())
handlers.set(InfoInvocations.GetScore, new GetScoreHandler())
handlers.set(InfoInvocations.AdminViewScore, new AdminViewScoreHandler())
handlers.set(InfoInvocations.AdminViewStreak, new AdminViewStreakHandler())
handlers.set(InfoInvocations.AdminAdjustScore, new AdminAdjustScore())
handlers.set(InfoInvocations.AdminSetStreak, new AdminModifyStreak())
handlers.set(InfoInvocations.Emergency, new EmergencyHandler())
handlers.set(InfoInvocations.Timezone, new TimeZoneHandler())

export default handlers
