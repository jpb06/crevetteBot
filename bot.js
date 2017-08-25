const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone:true
});

const botSettings = require('./botsettings.json');
const arguments = require('./business/argumentsChecking.js');
const scores = require('./business/scoresManager.js');
const inviteLink = require('./util/inviteLink.js');
const embedHelper = require('./util/embedHelper.js');

const db = require('./business/storage/sqlitestore.js');

client.login(botSettings.token);

client.on('ready', async () => {
  console.log(`I am ready! ${client.user.username} `); // ${client.user.avatarURL}
  embedHelper.botAvatarUrl = client.user.avatarURL;
  
  var channel = client.channels.find("name", botSettings.defaultChannel);
  channel.send({tts:false, embed: embedHelper.populateLoadedNotification()});
  
  db.createDatabase();

  inviteLink.generate(client);
});

client.on('message', async message => {
  if(message.author.bot) return; // not replying to others bots
  if(message.channel.type === 'dm') return; // direct messages should be ignored
  if(!message.content.startsWith(botSettings.prefix)) return; // ignoring messages not starting with command prefix

  let messageChunks = message.content.split(' ');
  let command = messageChunks[0];
  let args = messageChunks.slice(1);

  /* ------------------------------------------------------------------------------------------- 
     gaem command | !gaem @user1 10 @user2 5
     ------------------------------------------------------------------------------------------- */
  if(command === `${botSettings.prefix}gaem`) {

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
           db.createUser(user1.id, user1.username, user1.avatarURL);
           dbUser1 = {
             "userId": user1.id,
             "name": user1.username,
             "avatarUrl": user1.avatarURL,
             "wins": 0,
             "losses": 0,
             "streak": 0
           };
         } else {
          dbUser1 = values[0];
         }
         if(!values[1]) {
           db.createUser(user2.id, user2.username, user2.avatarURL);
           dbUser2 = {
            "userId": user2.id,
            "name": user2.username,
            "avatarUrl": user2.avatarURL,
            "wins": 0,
            "losses": 0,
            "streak": 0
          };
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

         let scoreResult = scores.resolve(user1.username, user1Score, user2.username, user2Score);
         
         scoreResult.player1.totalWins = dbUser1.wins += scoreResult.player1.score;
         scoreResult.player1.totalLosses = dbUser1.losses += scoreResult.player2.score;

         scoreResult.player2.totalWins = dbUser2.wins += scoreResult.player2.score
         scoreResult.player2.totalLosses = dbUser2.losses += scoreResult.player1.score

       //  console.log(scoreResult);
         
         db.updateUserStats(dbUser1.userId, dbUser1.wins, dbUser1.losses, 0);
         db.updateUserStats(dbUser2.userId, dbUser2.wins, dbUser2.losses, 0);

         message.channel.send({
           embed: embedHelper.populateReport(message.author.username, message.author.avatarURL, scoreResult)
         });
      });
    }
  }
  /* ------------------------------------------------------------------------------------------- 
     stat command | !stat @user
     ------------------------------------------------------------------------------------------- */
  if(command === `${botSettings.prefix}stat`) {
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
          db.getUserRank().then(data => {
            let rank = data.findIndex(i => i.userId === user.id) + 1;

            message.channel.send({
              embed: embedHelper.populateUserStat(client.user.username, client.user.avatarURL, userData, rank, data.length)
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
});
