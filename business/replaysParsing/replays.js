const relicChunkyParser = require('./relicChunky/relicchunky.parser.js');
const filesHelper = require('./../util/files.helper.js');
const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
  "describe": (attachment, downloadsFolder, client) => {
    if (attachment.filename.substr(attachment.filename.lastIndexOf('.') + 1) === 'rec') {
      var path = './' + downloadsFolder + '/' + attachment.filename;
      filesHelper.saveFromUrlUsingHttps(attachment.url, path, function (err) {
        if (err) {
          console.log(err.stack);
          return;
        }

        relicChunkyParser.getReplayData(path, function (replayData) {

          attachment.message.delete().then(msg => {
            msg.channel.send({
              embed: embedHelper.populateReplayInfos(client.user.username, client.user.avatarURL,
                attachment.filesize,
                msg.author.username,
                path, replayData)
            }).then(sentMsg => {
              filesHelper.delete(path);
            });
          }).catch(deleteErr => {
            console.log(deleteErr.stack);
          });
        });
      });
    }
  }
}