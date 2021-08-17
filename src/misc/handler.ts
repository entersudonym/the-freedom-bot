import { Message } from 'discord.js'

const COVID_TRIGGER_WORDS = ['vaccine', 'covid', 'vaccinated', 'vaccination', 'fauci']
const HERE_WE_GO =
    'https://tenor.com/view/ah-shit-here-we-go-again-ah-shit-cj-gta-gta-san-andreas-gif-13933485'

export const handleOffTopicMessage = (msg: Message): void => {
    const content = msg.content.toLowerCase()

    for (const trigger of COVID_TRIGGER_WORDS) {
        if (content.includes(trigger)) {
            msg.channel.send(HERE_WE_GO)
            return
        }
    }
}
