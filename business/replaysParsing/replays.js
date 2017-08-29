const relicChunkyParser = require('./relicChunky/relicChunkyParser.js');
const filesHelper = require('./../util/filesHelper.js');
const embedHelper = require('./../util/embedHelper.js');

module.exports = {
    describe: function(attachment, downloadsFolder, client) {
        if(attachment.filename.substr(attachment.filename.lastIndexOf('.') + 1) === 'rec') {
            var path = './' + downloadsFolder + '/'+attachment.filename;
            filesHelper.saveFromUrlUsingHttps(attachment.url, path, function(err) {
              if(err) { 
                console.log(err);
                return;
              }
    
              relicChunkyParser.getReplayData(path, function(replayData) {
    
                attachment.message.delete().then(msg =>
                {
                  msg.channel.send({
                    embed: embedHelper.populateReplayInfos(client.user.username, client.user.avatarURL, 
                                                           attachment.filesize,
                                                           msg.author.username, 
                                                           path, replayData)
                  }).then(sentMsg => {
                    filesHelper.delete(path);
                  });
                });
              });
            });
        }
    }
}