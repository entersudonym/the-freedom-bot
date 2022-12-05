import config from "../config/config";
import { Invocations } from "../data/invocations";

const channelMap:Map<string, string> = new Map()
channelMap.set(config.channels.journal, Invocations.Journal)
channelMap.set(config.channels.thankyou, Invocations.Gratefulness)


export function getInvocationfromChannel(channel:string){
    return channelMap.get(channel)
}

//Reverse lookup
export function getChannelIDfromInvocation(invocation:string){
    const channelID = [...channelMap.keys()]
        .find(key => channelMap.get(key) == invocation);

    return channelID
}
