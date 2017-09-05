const dbase = require('./../dal/storage.js').db();

const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
  "process": async (args, mentions, message, client) => {
    let errors = argumentsValidation.checkStatArgs(args, mentions.length);

    if (errors.length != 0) {
      message.channel.send({
        embed: embedHelper.populateStatError(client.user.username, client.user.avatarURL, errors)
      });
    } else {
      let user = mentions[0];

      try {
        let userData = await dbase.getUser(user.id);
        if (userData) {
          let sortedUsers = await dbase.getUsersByRatioRank();

          let ratioRank = sortedUsers.findIndex(i => i.userid === user.id) + 1;
          let eloRank = sortedUsers.sort((a, b) => b.elorating - a.elorating).findIndex(i => i.userid === user.id) + 1;

          message.channel.send({
            embed: embedHelper.populateUserStat(client.user.username, client.user.avatarURL, userData, eloRank, ratioRank, sortedUsers.length)
          });
        } else {
          message.channel.send({
            embed: embedHelper.populateNoDataForUser(client.user.username, client.user.avatarURL, user.username)
          });
        }
      } catch (err) {
        console.log(err.stack);
      }
    }
  }
}