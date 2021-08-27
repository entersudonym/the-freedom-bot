import { SprintStatus, SprintTier } from './types'

interface UpdateData {
    discordId: string
    username: string

    target: SprintTier
    status: SprintStatus
    failureReason?: string
}

// Looks at all users signed up for the given sprint, and creates a
export const generateUpdateData = async (sprintId: number): Promise<UpdateData[]> => {
    return []
}

// Formats UpdateData so we can nicely send it back to users within Discord.
export const formatUpdateData = (data: UpdateData[]): string => {
    return 'You have reached the formatter!'
}
