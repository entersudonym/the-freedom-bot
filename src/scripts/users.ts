import { User } from '../entity/User'

export async function createUser(discordId: string) {
    return await User.create({ discordId }).save()
}
