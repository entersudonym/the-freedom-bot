import { Invocations } from '../data/invocations'
import { User } from '../entity/User'
import { unaliasInvocation } from '../util/unalias'
import { BasicServiceResponse, SprintTier } from './types'

// !gold firstwatch
// !silver cold shower, meditation, foobar
//
export const handleSignUp = async (
    user: User,
    tier: SprintTier,
    content: string,
): Promise<BasicServiceResponse> => {
    const disciplineList = content.substr(content.indexOf(' ') + 1)
    const parsedDisciplineList = parseDisciplineList(disciplineList)
    // Parse the content string... woooweee
    return
}

const parseDisciplineList = (disciplineList: string): ParsedDisciplineList => {
    let parsedDisciplines: Partial<ParsedDisciplineList['disciplines']> = {}
    let misunderstood: string[] = []

    const parts = disciplineList.split(',')

    const canonicalInvocations = Object.values<string>(Invocations)
    for (const part of parts) {
        const unaliasedUserInvocation = unaliasInvocation(part)

        if (canonicalInvocations.includes(unaliasedUserInvocation)) {
            parsedDisciplines[unaliasedUserInvocation] = true
        } else {
            // TODO: At this point, run an (async?) Levenshtein distance to try to give the user
            // a string with what they might have intended otherwise.
            //
            // Oh, and add a bunch more convenient aliases so unaliasInvocation is more powerful.
            misunderstood.push(unaliasedUserInvocation)
        }
    }

    return {
        misunderstood,
        disciplines: parsedDisciplines,
    }
}

interface ParsedDisciplineList {
    error?: string
    misunderstood: string[]
    disciplines: Partial<
        {
            // No need to keep track of whether they want to do NF... because they have to!
            [key in Exclude<typeof Invocations[keyof typeof Invocations], 'setday'>]: boolean
        }
    >
}

// export const parseDisciplineList = (content: string):

console.log('hi')
