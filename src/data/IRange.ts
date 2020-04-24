/**
 * Lots of our data is used to match a number range (number of days, number of points) to a string,
 * which could be the name of a rank or a human-readable streak (e.g. "31-60 days"). Data of such
 * a form should implement this interface so that they can use a common function to extract name
 * values given a number.
 */

export default interface IRange {
    name: string
    lowerBound: number
    upperBound: number
}
