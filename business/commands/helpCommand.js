const embedHelper = require('./../util/embedHelper.js');

module.exports = {
    process: function(message) {
        message.channel.send({
            embed: embedHelper.populateHelp()
        });
    }
}