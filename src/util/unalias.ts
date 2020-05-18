import { AliasMapping } from '../data/invocations'

export function unaliasInvocation(invocation: string) {
    const unaliased = AliasMapping.get(invocation)
    return unaliased ? unaliased : invocation
}
