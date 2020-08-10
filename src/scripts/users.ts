import { User } from '../entity/User'

export async function createUser(discordId: string, username: string) {
    return await User.create({ discordId, username}).save()
}
