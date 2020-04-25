import IRange from './IRange'

export enum StreakNames {
    Day0 = '0 Days',
    Day1 = '1 Day',
    Days2To3 = '2-3 Days',
    Days4To7 = '4-7 Days',
    Days8To15 = '8-15 Days',
    Days16To30 = '16-30 Days',
    Days31To60 = '31-60 Days',
    Days61To90 = '61-90 Days',
    Days91To180 = '91-180 Days',
    Days181ToYear = '181 Days-1 Year',
    Year1Plus = '1 Year+'
}

export default [
    {
        name: StreakNames.Day0,
        lowerBound: 0,
        upperBound: 1
    },
    {
        name: StreakNames.Day1,
        lowerBound: 1,
        upperBound: 2
    },
    {
        name: StreakNames.Days2To3,
        lowerBound: 2,
        upperBound: 4
    },
    {
        name: StreakNames.Days4To7,
        lowerBound: 4,
        upperBound: 8
    },
    {
        name: StreakNames.Days8To15,
        lowerBound: 8,
        upperBound: 16
    },
    {
        name: StreakNames.Days16To30,
        lowerBound: 16,
        upperBound: 31
    },
    {
        name: StreakNames.Days31To60,
        lowerBound: 31,
        upperBound: 61
    },
    {
        name: StreakNames.Days61To90,
        lowerBound: 61,
        upperBound: 91
    },
    {
        name: StreakNames.Days91To180,
        lowerBound: 91,
        upperBound: 181
    },
    {
        name: StreakNames.Days181ToYear,
        lowerBound: 181,
        upperBound: 365
    },
    {
        name: StreakNames.Year1Plus,
        lowerBound: 365,
        upperBound: Infinity
    }
] as IStreak[]

interface IStreak extends IRange {
    name: StreakNames
    lowerBound: number
    upperBound: number
}
