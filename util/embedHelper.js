const Discord = require('discord.js');
const scoresManager = require('./../business/scoresManager.js');

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
    populateLoadedNotification: function() {
        let embed = this.generateGeneric()
            .setTitle('CrevetteBot successfully loaded')
            .setDescription('I am now ready for action!');

        return embed;
    },
    populateGaemError: function(authorName, authorAvatarUrl, errors){
        let embed = this.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription('Command usage :\n'+
                            '```!gaem @mention1 integer1 @mention2 integer2```\n'+
                            'Where :\n'+
                            '\t**__@mention1__** is player 1 discord identifier.\n'+
                            '\t**__integer1__** is the number of games won by player 1.\n'+
                            '\t**__@mention2__** is player 2 discord identifier.\n'+
                            '\t**__integer2__** is the number of games won by player 2.')
            .addField('Errors', errors);
        
        return embed;
    },
    populateStatError: function(authorName, authorAvatarUrl, errors){
            let embed = this.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription('Command usage :\n'+
                    '```!stat @mention```\n'+
                    'Where :\n'+
                    '\t**__@mention__** is the player discord identifier.\n')
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
    populateRanks: function(authorName, authorAvatarUrl, users){
        //userId, name, avatarUrl, wins, losses, streak

        let embed = this.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Top players by rank')
            .setDescription('These are the best DoWpro players');

        users.forEach((el, index) => {
            let ratio = scoresManager.calculateRatio(el.wins, el.losses);

            embed.addField(`${el.name} ${index+1} / ${users.length}`, `${el.wins} wins / ${el.losses} losses\n` +
                                                                      `Ratio : ${ratio}`);
        });

        return embed;
    }
}