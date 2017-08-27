const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone:true
});

const botSettings = require('./botsettings.json');
const arguments = require('./business/commands/argumentsChecking.js');
const scores = require('./business/ranking/scoresManager.js');
const inviteLink = require('./business/util/inviteLink.js');
const embedHelper = require('./business/util/embedHelper.js');
const usersHelper = require('./business/dal/usersHelper');

const db = require('./business/dal/storage/sqlitestore.js');

/* ----------------------------------------------------------------------------------------------- */
client.on('ready', async () => {
  console.log(`I am ready! ${client.user.username} `); // ${client.user.avatarURL}
  embedHelper.botAvatarUrl = client.user.avatarURL;

  await client.user.setGame(`on ${client.guilds.size} servers`);
  
  // client.guilds.forEach(guild => {
  //     let channel = guild.channels.find(channel => channel.name === botSettings.defaultChannel);
  //     channel.send({tts:false, embed: embedHelper.populateLoadedNotification()});
  // });
  
  db.createDatabase();

  // inviteLink.generate(client);
});
/* ----------------------------------------------------------------------------------------------- */
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});
/* ----------------------------------------------------------------------------------------------- */
client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});
/* ----------------------------------------------------------------------------------------------- */
client.on('message', async message => {
  if(message.author.bot) return; // not replying to others bots
  if(message.channel.type === 'dm' || message.channel.name !== botSettings.defaultChannel) return; // direct messages should be ignored
  if(!message.content.startsWith(botSettings.prefix)) return; // ignoring messages not starting with command prefix

  let messageChunks = message.content.toLowerCase().slice(botSettings.prefix.length).trim().split(/ +/g);
  let command = messageChunks[0];
  let args = messageChunks.slice(1);

  /* ------------------------------------------------------------------------------------------- 
     gaem command | !gaem @user1 10 @user2 5
     ------------------------------------------------------------------------------------------- */
  if(command === 'gaem') { 

    let mentions = message.mentions.users.array();
    let errors = arguments.CheckGaemArgs(args, mentions.length);

    if(errors.length != 0) {
      message.channel.send({
        embed: embedHelper.populateGaemError(client.user.username, client.user.avatarURL, errors)
      });
    } else {

      let user1 = mentions[0];
      let user2 = mentions[1];

      Promise.all([db.getUser(user1.id), db.getUser(user2.id)]).then(values => {
         let dbUser1, dbUser2;

         if(!values[0]) {
          dbUser1 = usersHelper.createUser(user1.id, user1.username, user1.avatarURL);
         } else {
          dbUser1 = values[0];
         }
         if(!values[1]) {
          dbUser2 = usersHelper.createUser(user2.id, user2.username, user2.avatarURL);
         } else {
          dbUser2 = values[1];
         }

         let user1Score, user2Score;
         if(args[0].includes(user1.id)){
          user1Score = Number.parseInt(args[1]);
          user2Score = Number.parseInt(args[3]);
         } else {
          user1Score = Number.parseInt(args[3]);
          user2Score = Number.parseInt(args[1]);
         }

         let scoreResult = scores.resolve(user1.username, user1Score, dbUser1.eloRating, 
                                          user2.username, user2Score, dbUser2.eloRating);
         
         scoreResult.player1.totalWins = dbUser1.wins += scoreResult.player1.score;
         scoreResult.player1.totalLosses = dbUser1.losses += scoreResult.player2.score;

         scoreResult.player2.totalWins = dbUser2.wins += scoreResult.player2.score
         scoreResult.player2.totalLosses = dbUser2.losses += scoreResult.player1.score

       //  console.log(scoreResult);
         
         db.updateUserStats(dbUser1.userId, dbUser1.wins, dbUser1.losses, scoreResult.player1.eloRating);
         db.updateUserStats(dbUser2.userId, dbUser2.wins, dbUser2.losses, scoreResult.player2.eloRating);

         message.channel.send({
           embed: embedHelper.populateReport(message.author.username, message.author.avatarURL, 
                                             dbUser1.eloRating, dbUser2.eloRating, scoreResult)
         });
      });
    }
  }
  /* ------------------------------------------------------------------------------------------- 
     stat command | !stat @user
     ------------------------------------------------------------------------------------------- */
  if(command === 'stat') {
    let mentions = message.mentions.users.array();
    let errors = arguments.CheckStatArgs(args, mentions.length);

    if(errors.length != 0) {
      message.channel.send({
        embed: embedHelper.populateStatError(client.user.username, client.user.avatarURL, errors)
      });
    } else {
      let user = mentions[0];

      db.getUser(user.id).then(userData => {
        if(userData){
          db.getUsersByRatioRank().then(data => {
            let ratioRank = data.findIndex(i => i.userId === user.id) + 1;
            let eloRank = data.sort((a, b) => b.eloRating - a.eloRating).findIndex(i => i.userId === user.id)+1;

            message.channel.send({
              embed: embedHelper.populateUserStat(client.user.username, client.user.avatarURL, userData, eloRank, ratioRank, data.length)
            });
          });
        } else {
          message.channel.send({
            embed: embedHelper.populateNoDataForUser(client.user.username, client.user.avatarURL, user.username)
          });
        }
      });
    }
  }
  /* ------------------------------------------------------------------------------------------- 
     top command | !top <byratio | byelo>
     ------------------------------------------------------------------------------------------- */
  if(command === 'top') {
    let errors = arguments.CheckTopArgs(args);
    
    if(errors.length != 0) {
      message.channel.send({
        embed: embedHelper.populateTopError(client.user.username, client.user.avatarURL, errors)
      });
    } else {
      db.getUsersByRatioRank().then(data => {
        let ordered;
        let by;
        if(args[0] === 'byratio'){ 
          ordered = data;
          by = 'ratio';
        } else { 
          ordered = data.sort((a, b) => b.eloRating - a.eloRating);
          by = 'elo';
        }

        message.channel.send({
          embed: embedHelper.populateTop(client.user.username, client.user.avatarURL, ordered.slice(0, 10), data.length, by)
        });
      });
    }
  }
  /* ------------------------------------------------------------------------------------------- 
     help command | !help
     ------------------------------------------------------------------------------------------- */
  if(command === 'help') {
    message.channel.send({
      embed: embedHelper.populateHelp()
    });
  }
});
/* ----------------------------------------------------------------------------------------------- */
client.login(botSettings.token);