const sql = require("sqlite");

sql.open("./data/score.sqlite");

let unit = module.exports = {
    "createDatabase": async () => {
        return await sql.run("CREATE TABLE IF NOT EXISTS scores (userid TEXT, name TEXT, avatarurl TEXT, wins INTEGER, losses INTEGER, elorating INTEGER);");
    },
    "createUser": async (userid, name, avatarurl) => {
        return await sql.run(`INSERT INTO scores (userid, name, avatarurl, wins, losses, elorating) VALUES (${userid}, ${name}, ${avatarurl}, 0, 0, 1000);`);
    },
    "getUser": async (userid) => {
        return await sql.get(`SELECT userid, name, avatarurl, wins, losses, elorating FROM scores WHERE userid = "${userid}";`);
    },
    "getUsersByRatioRank": async () => {
        return await sql.all('SELECT userid, name, avatarurl, wins, losses, elorating, ' +
            'CASE WHEN wins = 0 THEN 0.0 ' +
            'WHEN losses = 0 THEN 100.0 ' +
            'ELSE ((1.0 * wins / ( wins + losses )) * 100.0) ' +
            'END as ratio ' +
            'FROM scores ORDER BY ratio DESC, wins DESC;');
    },
    "updateUserStats": async (userid, wins, losses, elorating) => {
        return await sql.run(`UPDATE scores SET wins = ${wins}, losses = ${losses}, elorating = ${elorating} WHERE userid = ${userid};`);
    }
}

