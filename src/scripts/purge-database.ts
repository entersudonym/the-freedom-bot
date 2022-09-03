import { createConnection } from "typeorm";
import {User} from '../entity/User'
import {Client, GuildMember, Intents, User as DiscordUser} from 'discord.js'
import config from '../config/config'
const client = new Client({
    intents:[
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES]
})

//standalone script

client.on('ready',()=>{
    console.log("Running....");
    run()
})

async function run(){
    await createConnection()
    const users = await User.find()
    const serverMembers = await fetchAllUsers()

    users.forEach(async user=>{
        const userID = user.discordId
        
        if(!serverMembers.has( userID )){
            console.log("Removing " + (await client.users.fetch(userID)).username)
            User.remove(user)
        }
        
    })
}

async function fetchAllUsers(){
    const userMap = new Map<string,string>()
    const server = await client.guilds.fetch('705936078921793546')
    const membs = await server.members.fetch()

    membs.forEach(mem => userMap.set(mem.user.id, mem.user.username))
    return userMap
    }

client.login(config.key)

//ids 6 9 11