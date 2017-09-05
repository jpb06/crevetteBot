const { Pool } = require('pg');

let host = '', database = '', port = '', user = '', password = '', ssl = false;
try {
  // case dev local
  let privateSettings = require('./../../../conf/private.config.local.js').env;

  host = privateSettings.dbHost;
  database = privateSettings.db;
  port = privateSettings.port;
  user = privateSettings.user;
  password = privateSettings.password;
} catch (ex) {
  // case deploy
  host = process.env.dbHost;
  database = process.env.db;
  port = process.env.port;
  user = process.env.user;
  password = process.env.password;
  ssl = true;
}

const pool = new Pool({
  host: host,
  database: database,
  port: port,
  user: user,
  password: password,
  ssl: ssl
});

let self = module.exports = {
  "execute": async (sql) => {
    const client = await pool.connect();

    try {
      let q = await client.query(sql);

      return q.rows;
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.release();
    }
  },
  "createDatabase": async () => {
    let sql = "CREATE TABLE IF NOT EXISTS scores (userid TEXT, name TEXT, avatarurl TEXT, wins INTEGER, losses INTEGER, elorating INTEGER);";
    //console.log(sql);

    return await self.execute(sql);
  },
  "createUser": async (userid, name, avatarurl) => {
    let sql = `INSERT INTO scores (userid, name, avatarurl, wins, losses, elorating) VALUES ('${userid}', '${name}', '${avatarurl}', 0, 0, 1000);`;
    //console.log(sql);

    return await self.execute(sql);
  },
  "getUser": async (userid) => {
    let sql = `SELECT userid, name, avatarurl, wins, losses, elorating FROM scores WHERE userid = '${userid}';`;
    //console.log(sql);

    let res = await self.execute(sql);

    if (res.length === 1) return res[0];

    return null;
  },
  "getUsersByRatioRank": async () => {
    let sql = 'SELECT userid, name, avatarurl, wins, losses, elorating, ' +
      'CASE WHEN wins = 0 THEN 0.0 ' +
      'WHEN losses = 0 THEN 100.0 ' +
      'ELSE ((1.0 * wins / ( wins + losses )) * 100.0) ' +
      'END as ratio ' +
      'FROM scores ORDER BY ratio DESC, wins DESC;';
    //console.log(sql);

    return await self.execute(sql);
  },
  "updateUserStats": async (userid, wins, losses, elorating) => {
    let sql = `UPDATE scores SET wins = ${wins}, losses = ${losses}, elorating = ${elorating} WHERE userid = '${userid}'`;
    //console.log(sql);

    return await self.execute(sql);
  }
}