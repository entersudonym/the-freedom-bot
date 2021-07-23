export let journalCache: Map<string, string> = new Map()

export let gratefulnessCache: Map<string, string> = new Map()

const cacheMap = {
    "journal" : journalCache,
    "gratefulness" : gratefulnessCache
}

export type caches = keyof typeof cacheMap
