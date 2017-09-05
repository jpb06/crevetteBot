const dbase = require('./../dal/storage.js').db();

const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
  "process": async (args, message, client) => {
    let errors = argumentsValidation.checkTopArgs(args);

    if (errors.length != 0) {
      message.channel.send({
        embed: embedHelper.populateTopError(client.user.username, client.user.avatarURL, errors)
      });
    } else {
      try {
        let sortedUsers = await dbase.getUsersByRatioRank();

        let ordered, by;
        if (args[0] === 'byratio') {
          ordered = sortedUsers;
          by = 'ratio';
        } else {
          ordered = sortedUsers.sort((a, b) => b.elorating - a.elorating);
          by = 'elo';
        }

        message.channel.send({
          embed: embedHelper.populateTop(client.user.username, client.user.avatarURL, ordered.slice(0, 10), sortedUsers.length, by)
        });
      } catch (err) {
        console.log(err.stack);
      }
    }
  }
}