// These should never change without migration, since they get added to the database.
export enum SprintTier {
    Silver = 'silver',
    Bronze = 'bronze',
    Gold = 'gold',
}

export const SprintTierLevels = <const>{
    [SprintTier.Silver]: 3,
    [SprintTier.Bronze]: 5,
}

export enum SprintAdministrationInvocations {
    Start = 'start',
    End = 'end',
}

// This too should never change without migration, since we add it to the DB.
export enum SprintStatus {
    Enrolled = 1, // start at one to avoid falsy casts
    Failed,
    Succeeded,
}

export interface BasicServiceResponse {
    ok: boolean
    msg: string
}
