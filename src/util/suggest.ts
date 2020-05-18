import { Invocations, InfoInvocations } from '../data/invocations'
import { Command } from '../entity/Command'
import { In } from 'typeorm'
import { unaliasInvocation } from './unalias'

/**
 * Return all the commands in the database similar to `query`, using the Levenshtein threshold
 * `threshold`. `includeAdmin`, if true, will include admin-only commands. This function is used
 * by the ingress, which will suggest commands if no matching one is found.
 */
export async function findSimilarCommands(query: string, threshold: number, includeAdmin: boolean) {
    const adminQuery = includeAdmin ? {} : { isAdmin: false }
    const availableCommands = await Command.find({
        ...adminQuery
    })
    let hits: Command[] = []

    availableCommands.forEach(cmd => {
        if (levenshtein(query, cmd.invocation) <= threshold) hits.push(cmd)
        else if (levenshtein(unaliasInvocation(query), cmd.invocation) <= threshold) hits.push(cmd)
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
