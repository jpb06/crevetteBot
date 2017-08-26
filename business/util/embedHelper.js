const Discord = require('discord.js');
const scoresManager = require('./../ranking/scoresManager.js');
const commandsDescriptions = require('./../commands/commandsDescriptions.js');

module.exports = {
    botAvatarUrl:'',
    init: function(botAvatarUrl) {
        this.botAvatarUrl = botAvatarUrl;
        return this;
    },
    generateGeneric: function() {
        let embed = new Discord.RichEmbed()
            .setThumbnail('http://i.imgur.com/oBBZtML.png')
            .setTimestamp(new Date())
            .setFooter('© SaucisseNotFound Inc.', this.botAvatarUrl);

        return embed;
    },
    populateCommandsDescription: function(embed) {
        embed.addField('!help', 'Get help!\n\n'+
                                 commandsDescriptions.helpUsage())
             .addField('!gaem', 'Registers game results between two players.\n\n'+
                                 commandsDescriptions.gaemUsage())
             .addField('!stat', 'Displays the stats of a player.\n\n'+
                                 commandsDescriptions.statUsage())
             .addField('!top',  'Displays top 10 players.\n\n'+
                                 commandsDescriptions.topUsage());
        
        return embed;
    },
    populateLoadedNotification: function() {
        let embed = this.generateGeneric()
            .setTitle('CrevetteBot successfully loaded')
            .setDescription('I am now ready for action!\nCurrent commands are the following :');
     
        return this.populateCommandsDescription(embed);
    },
    populateHelp:function(){
        let embed = this.generateGeneric()
            .setTitle('CrevetteBot is handling gaming stats for you!')
            .setDescription('I am doing my best to answer your requests. Please take a look at the following commands :');

        return this.populateCommandsDescription(embed);
    },
    populateGaemError: function(authorName, authorAvatarUrl, errors){
        let embed = this.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.gaemUsage())
            .addField('Errors', errors);
        
        return embed;
    },
    populateStatError: function(authorName, authorAvatarUrl, errors){
        let embed = this.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.statUsage())
            .addField('Errors', errors);

        return embed;
    },
    populateNoDataForUser: function(authorName, authorAvatarUrl, user) {
        let embed = this.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle(`${user} is not registered yet`);

        return embed;
    },
    populateReport: function(authorName, authorAvatarUrl, scoreResult) {
        let embed = this.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName + ' reported a result', authorAvatarUrl)
            .setDescription(scoreResult.isDraw ? 
                                `Draw! : ${scoreResult.player1.score} - ${scoreResult.player2.score}` : 
                                `${scoreResult.winner.name} wins ${scoreResult.winner.score} - ${scoreResult.loser.score}`)
            .addField(`${scoreResult.player1.name} (${scoreResult.player1.totalWins} wins ${scoreResult.player1.totalLosses} losses)`, 
                      `${scoreResult.player1.score} / ${scoreResult.totalGames}`)
            .addField(`${scoreResult.player2.name} (${scoreResult.player2.totalWins} wins ${scoreResult.player2.totalLosses} losses)`, 
                      `${scoreResult.player2.score} / ${scoreResult.totalGames}`);

        return embed;
    },
    populateUserStat: function(authorName, authorAvatarUrl, userData, rank, totalPlayers) {
        let ratio = scoresManager.calculateRatio(userData.wins, userData.losses);

        let embed = this.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle(`${userData.name} statistics`)
            .setDescription(`**__Win/loss ratio__** : ${ratio}\n**__Rank__** : ${rank} / ${totalPlayers}`)
            .addField('Wins', `${userData.wins} games`)
            .addField('Losses', `${userData.losses} games`)
            .addField('Total games played', `${userData.wins + userData.losses} games`);

        return embed;
    },
    populateRanks: function(authorName, authorAvatarUrl, users, totalPlayers){
        let embed = this.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Top 10 players by rank')
            .setDescription('These are the best DoWpro players');

        users.forEach((el, index) => {
            let ratio = scoresManager.calculateRatio(el.wins, el.losses);

            embed.addField(`${el.name} - ${index+1} / ${totalPlayers}`, `${el.wins} wins / ${el.losses} losses\n` +
                                                                      `Ratio : ${ratio}`);
        });

        return embed;
    }
}