import { Invocations, InfoInvocations } from './invocations'

const commands: ICommand[] = [
    {
        name: 'Making Affirmations',
        description: 'Record if you wrote and said three affirmations in a given day.',
        invocation: Invocations.Affirmation,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Cold Showers',
        description: 'Record whether you took a cold-shower in the morning.',
        invocation: Invocations.ColdShower,
        points: 0.2,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Showing Gratefulness',
        description: 'Record whether you noted three things for which you are grateful today.',
        invocation: Invocations.Gratefulness,
        points: 0.15,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Daily Journaling',
        description: 'Record whether you posted a journal entry in the journals channel.',
        invocation: Invocations.Journal,
        points: 1,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Making Your Bed',
        description: `Record if you made your bed first thing in the morning.`,
        invocation: Invocations.MakeBed,
        points: 0.15,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Meditation and Mindfulness',
        description:
            'Assess your present state using the meditative style you prefer for a minimum of 10 minutes.',
        invocation: Invocations.Meditation,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'NoFap',
        description: 'Set your current streak by typing **!setday <day>**.',
        invocation: Invocations.SetDay,
        points: 1,
        isDaily: true,
        isAdmin: false
    },
    {
        name: 'Physical Fitness',
        description:
            '30 minutes of intense cardio, heavy weight-lifting session, 10,000 steps, etc.',
        invocation: Invocations.Workout,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    } // TODO: InfoInvocation commands need to be added here.
]

interface ICommand {
    name: string
    description: string
    invocation: Invocations | InfoInvocations
    points: number
    isDaily: boolean
    isAdmin: boolean
}

export default commands
