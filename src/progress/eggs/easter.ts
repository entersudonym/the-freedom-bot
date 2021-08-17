import { Message } from 'discord.js'
import { EasterEggInvocations } from '../../data/invocations'
import { buildEmbed } from '../../util/embeds'

// Returns whether the message was easter eggy.
export const handleEasterEgg = (msg: Message, invocation: string): boolean => {
    if (invocation === EasterEggInvocations.DrillBrush) {
        const embed = buildEmbed(
            'S',
            'Drill Brush',
            msg.author.id,
            `great job! While I can't award you points for this, I am certainly happy to hear the great news that you drillbrushed today.`,
        )

        msg.channel.send(embed)
        return true
    }

    return false
}
