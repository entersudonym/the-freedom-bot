import { User } from '../entity/User'

/*

Every single one of these commands should have Discord-independent implementations.

Administration:

All these commands will verify that you're a moderator:

!start - Opens enrollment for a new sprint
    - Only allowed in the last 7 days of the month
    - Starts a sprint for the subsequent month
!end - Closes the sprint out and reports who won what
    - Will NOT run automatically

Usage:
!(bronze|silver|gold) (commands|separated|by|space or comma)
    - Verifies that you have set your Timezone!
    - Only valid in the last 7 days of the month (in your timezone)
    - Signs you up for the next month's sprint (even if you're in the current sprint)
    -  
!update - Will show who is still in, what they're aiming for.
!fallen - Will show who has currently failed the sprint, what they *were* aiming for.

Database design:

"sprints" will hold  the list of all sprints
    - What month it is for and an ID
"sprinters" will hold data about who has signed up for a sprint
    - Will hold a reference to the sprint, which user, and what they signed up for
    - Will also hold their status: Awaiting, Progressing, Failed, Succeeded

Intermittent jobs:
- Every fifteen minutes, we'll:
    - See if a sprint is running
    - If it is, go through the list of progressing participants and see whether
      they still qualify. If not, we'll mark them as Failed and then send a notification
      to Discord.

- One week before the end of the month (UTC), remind the moderators to setup a sprint.
- 1 day before the end of the month (UTC), send another update to the admin channel. 
- At the beginning of the month (UTC), if there is a sprint, then send it to the check-ins channel.

- 11 days into the month, remind the moderators to end the sprint.
    - When a moderator calls the end of a sprint (if multiple, they have to specify.. an ID?),
      then we go through the list of people progressing, do a final check, and the mark them
      as succeeded. Then notify the chat.

*/

import { Message } from 'discord.js'
import { BasicServiceResponse, SprintAdministrationInvocations, SprintTier } from './types'
import { isAdmin } from '../util/permissions'
import { endSprint, startSprint } from './administration'
import { handleSignUp } from './enrollment'

// Goal: separate ALL interactions with the Discord API from local interactions

// Allowed: !${SprintTypes}, !start, !end
export const handleDiscordCheckInMessage = async (msg: Message): Promise<void> => {
    const res = await handleCheckInMessage(msg.author.id, msg.content, isAdmin(msg.member))
    await msg.reply(JSON.stringify(res))
}

type ErrorType = 'ErrorNoUser' | 'ErrorNoTimezone' | 'ErrorNotModerator' | 'ErrorNoInvocation'
interface HandledCheckInMsg {
    status: 'Ignore' | 'Ok' | ErrorType
}

const handleCheckInMessage = async (
    authorId: string,
    content: string,
    isModerator: boolean,
): Promise<HandledCheckInMsg> => {
    if (!content.startsWith('!')) {
        return { status: 'Ignore' }
    }

    let user = await User.findOne({ discordId: authorId })
    if (!user) {
        return { status: 'ErrorNoUser' }
    }
    if (!user.timeZone) {
        return { status: 'ErrorNoTimezone' }
    }

    const invocation = content.substr(1)
    if (Object.values<string>(SprintTier).includes(invocation)) {
        const res = await handleSignUp(user, content)
        // TODO: Convert this to something understandable and return.
    } else if (Object.values<string>(SprintAdministrationInvocations).includes(invocation)) {
        if (!isModerator) {
            return { status: 'ErrorNotModerator' }
        }

        let res: BasicServiceResponse
        if (invocation === SprintAdministrationInvocations.Start) {
            res = await startSprint()
            // TODO: If all went well, then do an @everyone and say that signups are open
        } else if (invocation === SprintAdministrationInvocations.End) {
            res = await endSprint()
            // TODO: If all went well, then generate the final report and send it to the channel
        }

        // TODO: Convert res to something understandable and return.
    } else {
        // TODO: give some suggestions.
        return { status: 'ErrorNoInvocation' }
    }
}
