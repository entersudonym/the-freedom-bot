import { User } from '../entity/User'

export async function createUser(discordId: string, isAdmin: boolean) {
    return await User.create({ discordId, isAdmin }).save()
}
