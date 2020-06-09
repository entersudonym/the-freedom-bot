export enum Invocations {
    MakeBed = 'make_bed',
    Affirmation = 'affirmation',
    ColdShower = 'cold_shower',
    Meditation = 'meditation',
    Workout = 'workout',
    Gratefulness = 'gratefulness',
    Journal = 'journal',
    SetDay = 'setday',
}

export enum InfoInvocations {
    Relapse = 'relapse',
    List = 'list',
    Emergency = 'emergency',
    Leaderboard = 'leaderboard',
    Ranks = 'ranks',
    GetDay = 'getday',
    GetScore = 'getscore',
    Timezone = 'timezone',
    AdminViewScore = 'viewscore',
    AdminAdjustScore = 'adjustscore',
    AdminViewStreak = 'viewstreak',
    AdminSetStreak = 'setstreak',
}

export enum AliasInvocations {
    Fitness = 'fitness', // Invocations.Workout
    Mindfulness = 'mindfulness', // Invocations.Meditation
}

export const AliasMapping: Map<string, Invocations | InfoInvocations> = new Map([
    [AliasInvocations.Fitness, Invocations.Workout],
    [AliasInvocations.Mindfulness, Invocations.Meditation],
])
