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
    Gratitude = 'gratitude', // Invocations.Gratefulness
    ColdShower = 'coldshower', // Invocations.ColdShower; note the lack of an underscore
    MakeBed = 'makebed', // Invocations.MakeBed; note the lack of an underscore
}

export const AliasMapping: Map<string, Invocations | InfoInvocations> = new Map([
    [AliasInvocations.Fitness, Invocations.Workout],
    [AliasInvocations.Mindfulness, Invocations.Meditation],
    [AliasInvocations.Gratitude, Invocations.Gratefulness],
    [AliasInvocations.ColdShower, Invocations.ColdShower],
    [AliasInvocations.MakeBed, Invocations.MakeBed],
])
