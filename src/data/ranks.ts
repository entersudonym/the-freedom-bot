import IRange from './IRange'

export enum RankNames {
    Ronin = 'Ronin',
    Ashigaru = 'Ashigaru',
    Lictor = 'Lictor',
    Hoplite = 'Hoplite',
    Janissary = 'Janissary',
    Kenin = 'Kenin',
    Samurai = 'Samurai',
    Imperator = 'Imperator',
    Gurkha = 'Gurkha',
    Medjay = 'Medjay',
    Sohei = 'Sohei',
    Praetorian = 'Praetorian',
    Kheshig = 'Kheshig',
    Spartan = 'Spartan',
    Varangian = 'Varangian',
    Yamabushi = 'Yamabushi',
    Legatus = 'Legatus',
    Navarch = 'Navarch',
    Polemarch = 'Polemarch',
    Strategos = 'Strategos'
}

export default [
    {
        name: RankNames.Ronin,
        value: 0,
        lowerBound: 0,
        upperBound: 6
    },
    {
        name: RankNames.Ashigaru,
        value: 1,
        lowerBound: 6,
        upperBound: 12
    },
    {
        name: RankNames.Lictor,
        value: 2,
        lowerBound: 12,
        upperBound: 18
    },
    {
        name: RankNames.Hoplite,
        value: 3,
        lowerBound: 18,
        upperBound: 28
    },
    {
        name: RankNames.Janissary,
        value: 4,
        lowerBound: 28,
        upperBound: 38
    },
    {
        name: RankNames.Kenin,
        value: 5,
        lowerBound: 38,
        upperBound: 48
    },
    {
        name: RankNames.Samurai,
        value: 6,
        lowerBound: 48,
        upperBound: 58
    },
    {
        name: RankNames.Imperator,
        value: 7,
        lowerBound: 58,
        upperBound: 78
    },
    {
        name: RankNames.Gurkha,
        value: 8,
        lowerBound: 78,
        upperBound: 108
    },
    {
        name: RankNames.Medjay,
        value: 9,
        lowerBound: 108,
        upperBound: 148
    },
    {
        name: RankNames.Sohei,
        value: 10,
        lowerBound: 148,
        upperBound: 198
    },
    {
        name: RankNames.Praetorian,
        value: 11,
        lowerBound: 198,
        upperBound: 258
    },
    {
        name: RankNames.Kheshig,
        value: 12,
        lowerBound: 258,
        upperBound: 318
    },
    {
        name: RankNames.Spartan,
        value: 13,
        lowerBound: 318,
        upperBound: 388
    },
    {
        name: RankNames.Varangian,
        value: 14,
        lowerBound: 388,
        upperBound: 458
    },
    {
        name: RankNames.Yamabushi,
        value: 15,
        lowerBound: 458,
        upperBound: 538
    },
    {
        name: RankNames.Legatus,
        value: 16,
        lowerBound: 538,
        upperBound: 618
    },
    {
        name: RankNames.Navarch,
        value: 17,
        lowerBound: 618,
        upperBound: 708
    },
    {
        name: RankNames.Polemarch,
        value: 18,
        lowerBound: 708,
        upperBound: 808
    },
    {
        name: RankNames.Strategos,
        value: 19,
        lowerBound: 808,
        upperBound: Infinity
    }
] as IRank[]

interface IRank extends IRange {
    name: RankNames
    value: number
}
