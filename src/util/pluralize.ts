/**
 * Naming convention adapted from https://github.com/blakeembrey/pluralize
 *
 * Utility for generating correct parity strings based on an original word, count, and optional
 * prefix. Examples follow.
 *
 * ```ts
 * pluralize('point', 4, 'new') // returns '4 new points'
 * pluralize('point', 1) // returns '1 point'
 * ```
 *
 * Pluralization irregularities are not yet handled: this function should be used mainly for
 * pluralizing words in replies. To ensure that callers of this function are aware of this
 * limitation, we make `word` limited to only those specified by `Words`.
 *
 * @param word the word to pluralize. Should be in its singular form
 * @param count the number of times this `word` exists
 * @param prefix an optional string to place between the count and pluralized word
 */
export default function pluralize(count: number, word: Words, prefix: string = ''): string {
    const pluralizedWord = count === 1 ? word : `${word}s`
    if (prefix) {
        return `${count} ${prefix} ${pluralizedWord}`
    } else {
        return `${count} ${pluralizedWord}`
    }
}

type Words = 'point' | 'hour'
