import { User } from '../entity/User'

export async function updateName(discordId, username: string): Promise<void> {
    await User.update({ discordId }, { username }) //   Updates username field wrt DiscordID
}
