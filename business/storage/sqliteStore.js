const sql = require("sqlite");

sql.open("./data/score.sqlite");

module.exports = {
    createDatabase: function() {
        return sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, name TEXT, avatarUrl TEXT, "+
                                                   "wins INTEGER, losses INTEGER, streak INTEGER)");
    },
    createUser: function(userId, name, avatarUrl) {
        return sql.run("INSERT INTO scores (userId, name, avatarUrl, wins, losses, streak) "+
                "VALUES (?, ?, ?, ?, ?, ?)", [userId, name, avatarUrl, 0, 0, 0]);
    },
    getUser: function(userId) {
        return sql.get(`SELECT * FROM scores WHERE userId = "${userId}"`);
    },
    getUserRank: function(){
        return sql.all(`SELECT userId FROM scores ORDER BY ((wins*100)/losses) DESC;`);
    },
    updateUserStats: function(userId, wins, losses, streak) {
        return sql.run(`UPDATE scores SET wins = ${wins}, losses = ${losses}, streak = ${streak} WHERE userId = ${userId}`);
    }
}

