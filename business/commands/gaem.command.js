const dbase = require('./../dal/storage.js').db();
const usersHelper = require('./../dal/users.helper.js');

const argumentsValidation = require('./shared/arguments.validation.js');
const embedHelper = require('./../util/embed.helper.js');

const scoresManager = require('./../ranking/scores.manager.js');

let unit = module.exports = {
  "process": async (args, mentions, message, client) => {
    let errors = argumentsValidation.checkGaemArgs(args, mentions.length);

    if (errors.length != 0) {
      message.channel.send({
        embed: embedHelper.populateGaemError(client.user.username, client.user.avatarURL, errors)
      });
    } else {
      let user1 = mentions[0];
      let user2 = mentions[1];

      try {
        let [dbUser1, dbUser2] = await Promise.all([dbase.getUser(user1.id), dbase.getUser(user2.id)]);

        if (!dbUser1) dbUser1 = await usersHelper.createUser(user1.id, user1.username, user1.avatarURL);
        if (!dbUser2) dbUser2 = await usersHelper.createUser(user2.id, user2.username, user2.avatarURL);

        let user1Score, user2Score;
        if (args[0].includes(user1.id)) {
          user1Score = Number.parseInt(args[1]);
          user2Score = Number.parseInt(args[3]);
        } else {
          user1Score = Number.parseInt(args[3]);
          user2Score = Number.parseInt(args[1]);
        }

        let scoreResult = scoresManager.resolve(user1.username, user1Score, dbUser1.elorating,
          user2.username, user2Score, dbUser2.elorating);

        scoreResult.player1.totalWins = dbUser1.wins += scoreResult.player1.score;
        scoreResult.player1.totalLosses = dbUser1.losses += scoreResult.player2.score;

        scoreResult.player2.totalWins = dbUser2.wins += scoreResult.player2.score
        scoreResult.player2.totalLosses = dbUser2.losses += scoreResult.player1.score

        await Promise.all([dbase.updateUserStats(dbUser1.userid, dbUser1.wins, dbUser1.losses, scoreResult.player1.elorating),
        dbase.updateUserStats(dbUser2.userid, dbUser2.wins, dbUser2.losses, scoreResult.player2.elorating)]);

        message.channel.send({
          embed: embedHelper.populateReport(message.author.username, message.author.avatarURL,
            dbUser1.elorating, dbUser2.elorating, scoreResult)
        });
      } catch (err) {
        console.log(err.stack);
      }
    }
  }
}