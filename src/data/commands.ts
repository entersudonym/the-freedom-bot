import { Invocations, InfoInvocations } from './invocations'

const commands: ICommand[] = [
    {
        name: 'Making Affirmations',
        altName: 'Affirmations',
        description: 'Record if you wrote and said three affirmations in a given day.',
        invocation: Invocations.Affirmation,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Cold Showers',
        altName: 'Cold Shower',
        description: 'Record whether you took a cold-shower in the morning.',
        invocation: Invocations.ColdShower,
        points: 0.2,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Showing Gratefulness',
        altName: 'Gratefulness',
        description: 'Record whether you noted three things for which you are grateful today.',
        invocation: Invocations.Gratefulness,
        points: 0.15,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Daily Journaling',
        altName: 'Journaling',
        description: 'Record whether you posted a journal entry in the journals channel.',
        invocation: Invocations.Journal,
        points: 1,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Making Your Bed',
        altName: 'Bed Making',
        description: `Record if you made your bed first thing in the morning.`,
        invocation: Invocations.MakeBed,
        points: 0.15,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Meditation and Mindfulness',
        altName: 'Meditation/Mindfulness',
        description:
            'Assess your present state using the meditative style you prefer for a minimum of 10 minutes.',
        invocation: Invocations.Meditation,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'NoFap',
        altName: 'NoFap',
        description: 'Set your current streak by typing **!setday <day>**.',
        invocation: Invocations.SetDay,
        points: 1,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Physical Fitness',
        altName: 'Workout',
        description:
            '30 minutes of intense cardio, heavy weight-lifting session, 10,000 steps, etc.',
        invocation: Invocations.Workout,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Emergency',
        description: 'Get emergency motivation.',
        invocation: InfoInvocations.Emergency,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Get Day',
        description: 'Get the last day you set for your NoFap streak.',
        invocation: InfoInvocations.GetDay,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Get Score',
        description: 'Get your current score.',
        invocation: InfoInvocations.GetScore,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Leaderboard',
        description: "See a leaderboard with everyone's points and relative positions.",
        invocation: InfoInvocations.Leaderboard,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'List',
        description: 'See a list of all the commands this bot supports.',
        invocation: InfoInvocations.List,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Ranks',
        description: 'See a list of all the ranks that you can achieve.',
        invocation: InfoInvocations.Ranks,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Relapse',
        description: 'Record a relapse as defined by our agreed-upon rules.',
        invocation: InfoInvocations.Relapse,
        points: null, // Dynamically figured out by the handler
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Timezone Setting',
        description:
            'Optionally sync your timezone with the bot to enrich your Freedom Bot experience.',
        invocation: InfoInvocations.Timezone,
        points: null,
        isDaily: false,
        isAdmin: false
    },
    {
        name: 'Admin View Score',
        description: 'View the score of any member by running the command and tagging them.',
        invocation: InfoInvocations.AdminViewScore,
        points: null,
        isDaily: false,
        isAdmin: true
    },
    {
        name: 'Admin View Streak',
        description: 'View the streak of any member by running the command and tagging them.',
        invocation: InfoInvocations.AdminViewStreak,
        points: null,
        isDaily: false,
        isAdmin: true
    },
    {
        name: 'Admin Modify Score',
        description: 'Modify the score of any member by running the command and tagging them.',
        invocation: InfoInvocations.AdminModifyScore,
        points: null,
        isDaily: false,
        isAdmin: true
    },
    {
        name: 'Admin Modify Streak',
        description: 'Modify the streak of any member by running the command and tagging them.',
        invocation: InfoInvocations.AdminModifyStreak,
        points: null,
        isDaily: false,
        isAdmin: true
    }
]

interface ICommand {
    name: string
    altName?: string
    description: string
    invocation: Invocations | InfoInvocations
    points: number | null
    isDaily: boolean
    isAdmin: boolean
}

export default commands
