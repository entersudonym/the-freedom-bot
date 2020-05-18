import { AliasMapping } from '../data/invocations'

/**
 * Returns a canonical invocation if one exists; otherwise, returns the original invocation.
 * Used to convert invocations like `!fitness` to its canonical counterpart, `!workout`.
 *
 * ```ts
 * unaliasInvocation("fitness") // workout
 * unaliasInvocation("workout") // workout
 * unaliasInvocation("foobar") // foobar
 * ```
 *
 * @param invocation the potentially non-canonical invocation a user is trying to run
 */
export function unaliasInvocation(invocation: string): string {
    const unaliased = AliasMapping.get(invocation)
    return unaliased ? unaliased : invocation
}
