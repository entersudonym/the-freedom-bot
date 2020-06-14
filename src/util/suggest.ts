import { Command } from '../entity/Command'
import { getCommands } from './db'
import { unaliasInvocation } from './unalias'

/**
 * For an issued invocation (`query`), finds similar commands. An invocation is "similar" to another
 * command if the invocation's alias is equal to the command, or the Levenshtein distance between
 * the invocation and the command's invocation is less than `threshold`.
 */
export async function findSimilarCommands(query: string, threshold: number, includeAdmin: boolean) {
    const commandBank = await getCommands(includeAdmin)
    let hits: Command[] = []

    commandBank.forEach(cmd => {
        if (unaliasInvocation(query) === cmd.invocation) {
            // This should never happen because we unalias in the ingress, so any valid alias
            // should already be matched to its canonical invocation
            hits.push(cmd)
        } else if (levenshtein(query, cmd.invocation) <= threshold) {
            hits.push(cmd)
        }
    })

    return hits
}

/**
 * Levenshtein implementation from RosettaCode:
 * https://rosettacode.org/wiki/Levenshtein_distance#JavaScript
 */
function levenshtein(a: string, b: string) {
    let t = [],
        u,
        i,
        j,
        m = a.length,
        n = b.length
    if (!m) {
        return n
    }
    if (!n) {
        return m
    }
    for (j = 0; j <= n; j++) {
        t[j] = j
    }
    for (i = 1; i <= m; i++) {
        for (u = [i], j = 1; j <= n; j++) {
            u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1
        }
        t = u
    }

    return u[n]
}
