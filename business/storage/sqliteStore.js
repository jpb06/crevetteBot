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
        return sql.all('SELECT userId, '+
                       'CASE WHEN wins = 0 THEN 0.0 '+
                            'WHEN losses = 0 THEN 100.0 '+
                            'ELSE ((1.0 * wins / ( wins + losses )) * 100.0) '+
                       'END as ratio '+
                       'FROM scores ORDER BY ratio DESC, wins DESC;');
    },
    updateUserStats: function(userId, wins, losses, streak) {
        return sql.run(`UPDATE scores SET wins = ${wins}, losses = ${losses}, streak = ${streak} WHERE userId = ${userId}`);
    }
}

