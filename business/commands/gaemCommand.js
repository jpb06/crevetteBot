const db = require('./../dal/storage/sqlitestore.js');
const usersHelper = require('./../dal/usersHelper.js');

const argumentsValidation = require('./shared/argumentsValidation.js');
const embedHelper = require('./../util/embedHelper.js');

const scoresManager = require('./../ranking/scoresManager.js');

module.exports = {
    process: function(args, mentions, message, client) {
        let errors = argumentsValidation.CheckGaemArgs(args, mentions.length);
  
        if(errors.length != 0) {
          message.channel.send({
            embed: embedHelper.populateGaemError(client.user.username, client.user.avatarURL, errors)
          });
        } else {
  
          let user1 = mentions[0];
          let user2 = mentions[1];
  
          Promise.all([db.getUser(user1.id), db.getUser(user2.id)]).then(values => {
            let dbUser1, dbUser2;
  
            if(!values[0]) {
              dbUser1 = usersHelper.createUser(user1.id, user1.username, user1.avatarURL);
            } else {
              dbUser1 = values[0];
            }
            if(!values[1]) {
              dbUser2 = usersHelper.createUser(user2.id, user2.username, user2.avatarURL);
            } else {
              dbUser2 = values[1];
            }
  
            let user1Score, user2Score;
            if(args[0].includes(user1.id)){
              user1Score = Number.parseInt(args[1]);
              user2Score = Number.parseInt(args[3]);
            } else {
              user1Score = Number.parseInt(args[3]);
              user2Score = Number.parseInt(args[1]);
            }
  
            let scoreResult = scoresManager.resolve(user1.username, user1Score, dbUser1.eloRating, 
                                                    user2.username, user2Score, dbUser2.eloRating);
            
            scoreResult.player1.totalWins = dbUser1.wins += scoreResult.player1.score;
            scoreResult.player1.totalLosses = dbUser1.losses += scoreResult.player2.score;
  
            scoreResult.player2.totalWins = dbUser2.wins += scoreResult.player2.score
            scoreResult.player2.totalLosses = dbUser2.losses += scoreResult.player1.score
  
          //  console.log(scoreResult);
            
            db.updateUserStats(dbUser1.userId, dbUser1.wins, dbUser1.losses, scoreResult.player1.eloRating);
            db.updateUserStats(dbUser2.userId, dbUser2.wins, dbUser2.losses, scoreResult.player2.eloRating);
  
            message.channel.send({
              embed: embedHelper.populateReport(message.author.username, message.author.avatarURL, 
                                                dbUser1.eloRating, dbUser2.eloRating, scoreResult)
            });
          });
        }
    }
}