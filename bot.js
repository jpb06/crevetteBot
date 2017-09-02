const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone:true
});

const db = require('./business/dal/storage/sqlitestore.js');
const embedHelper = require('./business/util/embedHelper.js');

const botSettings = require('./botsettings.json');
const gaemCommand = require('./business/commands/gaemCommand.js');
const statCommand = require('./business/commands/statCommand.js');
const topCommand = require('./business/commands/topCommand.js');
const helpCommand = require('./business/commands/helpCommand.js');
const replays = require('./business/replaysParsing/replays.js');
const adminCommand = require('./business/commands/adminCommand.js');

const inviteLink = require('./business/util/inviteLink.js');

/* ----------------------------------------------------------------------------------------------- */
client.on('ready', async () => {
  console.log(`I am ready! ${client.user.username} `);
  embedHelper.botAvatarUrl = client.user.avatarURL;

  await client.user.setGame(`on ${client.guilds.size} servers`);
  
  client.guilds.forEach(guild => {
    let channel = guild.channels.find(channel => channel.name === botSettings.defaultChannel);
    channel.send({tts:false, embed: embedHelper.populateLoadedNotification()});
  });

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
  if(message.channel.type === 'dm') return; // direct messages should be ignored

  if(message.channel.name === botSettings.defaultChannel || 
     message.channel.name === botSettings.adminChannel) {

    if(!message.content.startsWith(botSettings.prefix)) return; // ignoring messages not starting with command prefix  
  
    let messageChunks = message.content.toLowerCase().slice(botSettings.prefix.length).trim().split(/ +/g);
    let command = messageChunks[0];
    let args = messageChunks.slice(1);

    if(message.channel.name === botSettings.defaultChannel || message.channel.name === botSettings.adminChannel) {
      /* ------------------------------------------------------------------------------------------- 
        gaem command | !gaem @user1 10 @user2 5
        ------------------------------------------------------------------------------------------- */
      if(command === 'gaem') { 
        gaemCommand.process(args, message.mentions.users.array(), message, client);
      }
      /* ------------------------------------------------------------------------------------------- 
        stat command | !stat @user
        ------------------------------------------------------------------------------------------- */
      if(command === 'stat') {
        statCommand.process(args, message.mentions.users.array(), message, client);
      }
      /* ------------------------------------------------------------------------------------------- 
        top command | !top <byratio | byelo>
        ------------------------------------------------------------------------------------------- */
      if(command === 'top') {
        topCommand.process(args, message, client);
      }
      /* ------------------------------------------------------------------------------------------- 
        help command | !help
        ------------------------------------------------------------------------------------------- */
      if(command === 'help') {
        helpCommand.process(message);
      }
    } 
    
    if(message.channel.name === botSettings.adminChannel) {
      /* ------------------------------------------------------------------------------------------- 
        admin command | !admin setwins @user 5
                        !admin setlosses @user 3
                        !admin setelo @user 800   
                        !admin @user <elo> <wins> <losses>
        ------------------------------------------------------------------------------------------- */
      if(command === 'admin') {
        adminCommand.process(args, message.mentions.users.array(), message, client);
      }
    }
  } else if(botSettings.replaysChannels.includes(message.channel.name)) {
    
    // for tests
    //if(message.guild.name === 'dowpro (mod for Dawn of War)') return;

    if(message.attachments.length === 0) return;

    message.attachments.forEach(attachment => {
      replays.describe(attachment, botSettings.downloadsFolder, client);
    });
  }
});
/* ----------------------------------------------------------------------------------------------- */
client.login(process.env.apiKey);