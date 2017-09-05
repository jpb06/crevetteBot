const dbase = require('./storage.js').db();

let unit = module.exports = {
    "createUser": async (id, name, avatar) => {
        await dbase.createUser(id, name, avatar);
        return {
            "userid": id,
            "name": name,
            "avatarurl": avatar,
            "wins": 0,
            "losses": 0,
            "elorating": 1000
        };
    }
}