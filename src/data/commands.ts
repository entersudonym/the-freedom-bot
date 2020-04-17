import Invocations from './invocations'

const commands: ICommand[] = [
    {
        name: 'Making Affirmations',
        description: 'Record if you wrote and said three affirmations in a given day.',
        invocation: Invocations.Affirmation,
        points: 0.5,
        isDaily: true,
        isAdmin: false
    } // To be continued...
]

interface ICommand {
    name: string
    description: string
    invocation: Invocations
    points: number
    isDaily: boolean
    isAdmin: boolean
}

export default commands
