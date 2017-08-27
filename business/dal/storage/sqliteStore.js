const sql = require("sqlite");

sql.open("./data/score.sqlite");

module.exports = {
    createDatabase: function() {
        return sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, name TEXT, avatarUrl TEXT, "+
                                                          "wins INTEGER, losses INTEGER, eloRating INTEGER)");
    },
    createUser: function(userId, name, avatarUrl) {
        return sql.run("INSERT INTO scores (userId, name, avatarUrl, wins, losses, eloRating) "+
                       "VALUES (?, ?, ?, ?, ?, ?)", [userId, name, avatarUrl, 0, 0, 1000]);
    },
    getUser: function(userId) {
        return sql.get(`SELECT userId, name, avatarUrl, wins, losses, eloRating FROM scores WHERE userId = "${userId}"`);
    },
    getUsersByRatioRank: function(){
        return sql.all('SELECT userId, name, avatarUrl, wins, losses, eloRating, '+
                       'CASE WHEN wins = 0 THEN 0.0 '+
                            'WHEN losses = 0 THEN 100.0 '+
                            'ELSE ((1.0 * wins / ( wins + losses )) * 100.0) '+
                       'END as ratio '+
                       'FROM scores ORDER BY ratio DESC, wins DESC;');
    },
    updateUserStats: function(userId, wins, losses, eloRating) {
        return sql.run(`UPDATE scores SET wins = ${wins}, losses = ${losses}, eloRating = ${eloRating} WHERE userId = ${userId}`);
    }
}

