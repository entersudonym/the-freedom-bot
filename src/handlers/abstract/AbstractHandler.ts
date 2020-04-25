import { Message } from 'discord.js'
import { User } from '../../entity/User'
import { Command } from '../../entity/Command'
import { User as DiscordUser } from 'discord.js'

export default abstract class AbstractHandler {
    /**
     *
     * @param shouldRerank whether or not the AbstractHandler should rerank the user after the
     * concrete handler runs
     * @param verifyMention whether or not the AbstractHandler should ensure that the message
     * contains a mention.
     */
    public constructor(protected shouldRerank: boolean, protected verifyMention: boolean) {}

    protected abstract async handler(user: User, cmd: Command, msg: Message): Promise<void>

    protected async rerank(
        discordUser: DiscordUser,
        prevPoints: number,
        newPoints: number
    ): Promise<void> {
        console.log('Should do reranking here!')
    }

    public async evaluate(user: User, cmd: Command, msg: Message): Promise<any> {
        if (this.verifyMention) {
            const mentionedUsers = msg.mentions.users

            if (mentionedUsers.size === 0) {
                return msg.reply('you must mention the user on whom to run this command.')
            }

            if (mentionedUsers.size > 1) {
                return msg.reply('you can only mention one user at a time.')
            }
        }

        const prevPoints = user.points
        this.handler(user, cmd, msg)

        if (this.shouldRerank) {
            this.rerank(msg.author, prevPoints, user.points)
        }
    }
}
