const dbase = require('./../dal/storage.js').db();

const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": async (args, mentions, message, client) => {
        let errors = argumentsValidation.checkAdminArgs(args, mentions.length);

        if (errors.length != 0) {
            message.channel.send({
                embed: embedHelper.populateAdminError(client.user.username, client.user.avatarURL, errors)
            });
        } else {
            try {
                let userData = await dbase.getUser(mentions[0].id);

                if (args.length === 3) {
                    let value = Number.parseInt(args[2]);

                    if (args[0] === 'setwins') {
                        userData.wins = value;
                    } else if (args[0] === 'setlosses') {
                        userData.losses = value;
                    } else if (args[0] === 'setelo') {
                        userData.elorating = value;
                    }

                    await dbase.updateUserStats(userData.userid, userData.wins, userData.losses, userData.elorating);

                    message.channel.send({
                        embed: embedHelper.populateUserStatsUpdated(client.user.username, client.user.avatarURL, userData)
                    });
                } else if (args.length === 4) {
                    let wins = Number.parseInt(args[1]);
                    let losses = Number.parseInt(args[2]);
                    let elo = Number.parseInt(args[3]);

                    await dbase.updateUserStats(userData.userid, wins, losses, elo);
                    userData.wins = wins;
                    userData.losses = losses;
                    userData.elorating = elo;

                    message.channel.send({
                        embed: embedHelper.populateUserStatsUpdated(client.user.username, client.user.avatarURL, userData)
                    });
                }
            } catch (err) {
                console.log(err.stack);
            }
        }
    }
}