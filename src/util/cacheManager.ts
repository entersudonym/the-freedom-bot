import { User } from '../entity/User'
import { journalCache, gratefulnessCache, caches} from '../data/channelCaches'

/**
 * @param user The user
 * @param cacheType The cache that needs to be updated 
 */
export function addEntry(user: User, cacheType : caches) : void{
    const cache = resolveCache(cacheType)
    const userID = user.discordId
    const currTime = new Date()
    const datestr = currTime.toDateString()
    cache.set(userID, datestr)
}


/**
 * @param user The user
 * @param cacheType The cache that needs to be updated
 */
export function validiateEntry(user: User , cacheType: caches) : boolean{
    const cache = resolveCache(cacheType)
    const userID = user.discordId
    const timezone = user.timeZone

    const last_entry = cache.get(userID)
    if(!last_entry){
        return false
    }

    /* NOAH
    This is where we need to compare the current and fetched Dates
    */

    const isValid : boolean = true  //Placeholder variable to represent the comparision output. Will be replaced by the actual Date comparision
    return isValid
}

/**
 * @param cacheType The cache that needs to be cleaned
 */
export function purgeCache(cacheType: caches) : void{
    const cache = resolveCache(cacheType)
    for(let entry in cache.entries){
        const key = entry[0]
        const entryDate = entry[1]
        /* NOAH
            Need to compare the current and entry Dates.
        */
       const hasExpired : boolean = true    //Placeholder variable to represent the comparision output. Will be replaced by the actual Date comparision
       if(hasExpired){
           cache.delete(key)
       }
    }
}

function resolveCache(cacheType : caches){
    if(cacheType === "journal"){
        return journalCache
    }
    else if(cacheType === "gratefulness"){
        return gratefulnessCache
    }
    else{
        // We shouldn't get here
        return 
    }
}