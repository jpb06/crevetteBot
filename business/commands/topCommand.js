const db = require('./../dal/storage/sqlitestore.js');

const argumentsValidation = require('./shared/argumentsValidation.js');
const embedHelper = require('./../util/embedHelper.js');

module.exports = {
    process: function(args, message, client) {
        let errors = argumentsValidation.CheckTopArgs(args);
        
        if(errors.length != 0) {
          message.channel.send({
            embed: embedHelper.populateTopError(client.user.username, client.user.avatarURL, errors)
          });
        } else {
          db.getUsersByRatioRank().then(data => {
            let ordered;
            let by;
            if(args[0] === 'byratio'){ 
              ordered = data;
              by = 'ratio';
            } else { 
              ordered = data.sort((a, b) => b.eloRating - a.eloRating);
              by = 'elo';
            }
  
            message.channel.send({
              embed: embedHelper.populateTop(client.user.username, client.user.avatarURL, ordered.slice(0, 10), data.length, by)
            });
          });
        }
    }
}