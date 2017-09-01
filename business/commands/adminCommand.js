const db = require('./../dal/storage/sqlitestore.js');

const argumentsValidation = require('./shared/argumentsValidation.js');
const embedHelper = require('./../util/embedHelper.js');

module.exports = {
    process: function(args, mentions, message, client) {
        let errors = argumentsValidation.checkAdminArgs(args, mentions.length);

        if(errors.length != 0) {
            message.channel.send({
                embed: embedHelper.populateAdminError(client.user.username, client.user.avatarURL, errors)
            });
        } else {
            db.getUser(mentions[0].id).then(userData => {

                if(args.length === 3) {

                    let value = Number.parseInt(args[2]);

                    if(args[0] === 'setwins') {
                        userData.wins = value;
                    } else if(args[0] === 'setlosses') {
                        userData.losses = value;
                    } else if(args[0] === 'setelo') {
                        userData.eloRating = value;
                    }

                    db.updateUserStats(userData.userId, userData.wins, userData.losses, userData.eloRating).then(() => {
                        message.channel.send({
                            embed: embedHelper.populateUserStatsUpdated(client.user.username, client.user.avatarURL, userData)
                        });
                    });
                    
                } else if(args.length === 4) {

                    let wins = Number.parseInt(args[1]);
                    let losses = Number.parseInt(args[2]);
                    let elo = Number.parseInt(args[3]);

                    db.updateUserStats(userData.userId, wins, losses, elo).then(() => {
                        message.channel.send({
                            embed: embedHelper.populateUserStatsUpdated(client.user.username, client.user.avatarURL, userData)
                        });
                    });

                }
            });
        }
    }
}