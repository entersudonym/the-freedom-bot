import { Message } from 'discord.js';
import { journalCache, gratefulnessCache} from '../data/channelCaches'

/**
 * @param msg The message object.
 * @param channel The channel whose cache needs to be updated. 'j' stands for Journal and 'g' for Gratefulness
 */
export function addEntry(msg : Message, channel : 'j'|'g') : void{
    const cache = resolveCache(channel)
    const userID = msg.author.id
    const currTime = new Date() //NOAH: Is this supposed to a Date Object or something like moment()?
    cache.set(userID, currTime)
}


/**
 * @param msg The message object.
 * @param channel The channel whose cache needs to be queried. 'j' stands for Journal and 'g' for Gratefulness
 */
export function validiateEntry(msg : Message, channel: 'j'|'g') : boolean{
    const cache = resolveCache(channel)
    const userID = msg.author.id
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
 * @param channel The channel whose cache needs to be cleaned. 'j' stands for Journal and 'g' for Gratefulness
 */
export function purgeCache(channel: 'j'|'g') : void{
    const cache = resolveCache(channel)
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

function resolveCache(cacheType : 'j'|'g'){
    if(cacheType == 'j'){
        return journalCache
    }
    else if(cacheType == 'g'){
        return gratefulnessCache
    }
    else{
        // We shouldn't get here
        return 
    }
}