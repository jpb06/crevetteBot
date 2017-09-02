const db = require('./../dal/storage/sqliteStore.js');

const argumentsValidation = require('./shared/argumentsValidation.js');
const embedHelper = require('./../util/embedHelper.js');

module.exports = {
    process: function(args, mentions, message, client) {
        let errors = argumentsValidation.CheckStatArgs(args, mentions.length);
  
        if(errors.length != 0) {
          message.channel.send({
            embed: embedHelper.populateStatError(client.user.username, client.user.avatarURL, errors)
          });
        } else {
          let user = mentions[0];
  
          db.getUser(user.id).then(userData => {
            if(userData){
              db.getUsersByRatioRank().then(data => {
                let ratioRank = data.findIndex(i => i.userId === user.id) + 1;
                let eloRank = data.sort((a, b) => b.eloRating - a.eloRating).findIndex(i => i.userId === user.id)+1;
  
                message.channel.send({
                  embed: embedHelper.populateUserStat(client.user.username, client.user.avatarURL, userData, eloRank, ratioRank, data.length)
                });
              });
            } else {
              message.channel.send({
                embed: embedHelper.populateNoDataForUser(client.user.username, client.user.avatarURL, user.username)
              });
            }
          });
        }
    }
}