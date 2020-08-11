import {User} from "../entity/User"

export async function updateName(discordId : string, username : string)
{
    await User.update({discordId}, {username}) //Updates username field wrt DiscordID
}