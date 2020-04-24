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

interface IStreak extends IRange {
    name: StreakNames
    lowerBound: number
    upperBound: number
}
