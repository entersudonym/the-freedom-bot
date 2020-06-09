/**
 * Naming convention adapted from https://github.com/blakeembrey/pluralize
 *
 * Utility for generating correct parity strings based on an original word, count, and optional
 * prefix. Examples follow.
 *
 * ```ts
 * pluralize(4, 'point', 'new') // returns '4 new points'
 * pluralize(1, 'point') // returns '1 point'
 * ```
 *
 * Pluralization irregularities are not yet handled: this function should be used mainly for
 * pluralizing words in replies. To ensure that callers of this function are aware of this
 * limitation, we make `word` limited to only those specified by the enum `Words`.
 *
 * @param word the word to pluralize. Should be in its singular form
 * @param count the number of times this `word` exists
 * @param prefix an optional string to place between the count and pluralized word
 */
export default function pluralize(count: number, word: Words, prefix: string = ''): string {
    const pluralizedWord = count === 1 ? word : `${word}s`
    // Optionally rounds to two decimal places.
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    const roundedCount = Math.round((count + Number.EPSILON) * 100) / 100
    if (prefix) {
        return `${roundedCount} ${prefix} ${pluralizedWord}`
    } else {
        return `${roundedCount} ${pluralizedWord}`
    }
}

type Words = 'point' | 'hour' | 'day'
