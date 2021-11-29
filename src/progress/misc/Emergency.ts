import { Message } from 'discord.js'
import { Command } from '../../entity/Command'
import { User } from '../../entity/User'
import AbstractHandler from '../abstract/AbstractHandler'
import axios from 'axios'
import config from '../../config/config'

export default class EmergencyHandler extends AbstractHandler {
    public constructor() {
        super(false, false, false, false)
    }

    protected async handler(_user: User, _cmd: Command, msg: Message): Promise<any> {
        // const response = await axios.get(config.urls.emergency)
        return msg.channel.send(
            'This command no longer works and will be soon removed from the bot. You should not need memes and GIFs to help you avoid relapse. Use of such sources indicates a reliance on motivation instead of discipline.',
        )
    }
}
