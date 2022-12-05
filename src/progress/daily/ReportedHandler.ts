import { Message} from "discord.js";
import { Command } from "../../entity/Command";
import { User } from "../../entity/User";
import AbstractHandler from "../abstract/AbstractHandler";
import config from "../../config/config";
import { getLastReport } from "../../util/db";
import { buildEmbed, errorReply } from "../../util/embeds";
import ErrorTitles from "../../util/ErrorTitles";
import pluralize from "../../util/pluralize";
const moment = require('moment')
import { Report } from "../../entity/Report";
import { InfoInvocations } from "../../data/invocations";
import { getChannelIDfromInvocation } from "../../util/channelMapping";
import { getChannelFromClient } from "../../util/discord";

export default class ReportedDisciplineHandler extends AbstractHandler{
    public constructor(){
        super(false, true, false, false)
    }

    protected async handler(user:User, cmd: Command, msg:Message){
        const channel = msg.channel.id
        const report = await getLastReport(user, cmd)
        const sameDay = await isSameDay(user, report)

        if(channel != config.channels.progressReporting){
            //Indicates a discipline entry in the respective channel
            if(!sameDay){
                await Report.create({
                    user,
                    command: cmd,
                    points: 0,
                    isRegression: false,
                    day: null
                }).save()
            }
            return
        }

        //User is attempting to report the discipline
        if(sameDay){
            if(report.points == 0){
                const pointsToAward = cmd.points

                report.points = pointsToAward
                report.save()

                user.points += pointsToAward
                await user.save()

                const embed = buildEmbed(
                    msg,
                    'S',
                    `${cmd.altName || cmd.name} Recorded`,
                    msg.author.id,
                    `successfully added ${pluralize(
                        pointsToAward,
                        'point'
                    )} to your account. You now have ${pluralize(user.points, 'point')}.`
                )
        
                return msg.channel.send(embed)
            }

            else{
                //Claimed today
                if (!user.timeZone) {
                    return errorReply(
                        msg,
                        ErrorTitles.TimeElapsed,
                        `you ran that command less than 24 hours ago. If you'd like to base the bot-timings on your timezone, use the **!${InfoInvocations.Timezone}** command.`
                    )
                }
                const timeToWait = moment()
                    .tz(user.timeZone)
                    .endOf('day')
                    .diff(moment.tz(user.timeZone), 'hours')

                return errorReply(
                    msg,
                    ErrorTitles.TimeElapsed,
                    `you already ran that command today. Wait for the end of the day (in about ${pluralize(
                        timeToWait,
                        'hour'
                    )}).`
                )
            }
        }

        else{
            const channelID = getChannelIDfromInvocation(cmd.invocation)
            return errorReply(
                msg,
                ErrorTitles.ReportNotFound,
                `you have not made an entry for this discipline today. Post an entry in ${getChannelFromClient(msg.client, channelID)}`
            )}

    }
}


//Checks if the last report of the discipline is on the same day
async function isSameDay(user: User, report:Report): Promise<Boolean> {
    if(!report){
        return false
    }
    const tmz = user.timeZone??'UTC'
    const postDate = moment(report.date).tz(tmz)
    const nowDate = moment().tz(tmz)
    return nowDate.isSame(postDate,'day')
}