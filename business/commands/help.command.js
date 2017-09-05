const embedHelper = require('./../util/embed.helper.js');

let unit = module.exports = {
    "process": (message) => {
        message.channel.send({
            embed: embedHelper.populateHelp()
        });
    }
}