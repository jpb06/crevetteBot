const botSettings = require('./../../conf/bot.settings.json');

let unit = module.exports = {
    "db": () => {
        if (botSettings.dbase === 'postgres') {
            return require('./storage/postgres.store.js');
        } else if (botSettings.dbase === 'sqlite') {
            return require('./storage/sqlite.store.js');
        }
    }
}