import {User} from "../entity/User"

export async function updateName(discordID : string, name : string)
{
    await User.update({discordId : discordID}, {username : name}) //Updates username field wrt DiscordID
}