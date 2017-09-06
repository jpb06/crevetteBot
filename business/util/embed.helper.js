const Discord = require('discord.js');
const scoresManager = require('./../ranking/scores.manager.js');
const commandsDescriptions = require('./../commands/shared/commands.description.js');
const replayDataMapper = require('./../replaysParsing/replaydata.mapper.js');

let unit = module.exports = {
    "botAvatarUrl": '',
    "init": (botAvatarUrl) => {
        unit.botAvatarUrl = botAvatarUrl;
        return unit;
    },
    "generateGeneric": () => {
        let embed = new Discord.RichEmbed()
            .setThumbnail('http://i.imgur.com/oBBZtML.png')
            .setTimestamp(new Date())
            .setFooter('© SaucisseNotFound Inc.', unit.botAvatarUrl);

        return embed;
    },
    "populateCommandsDescription": (embed) => {
        embed.addField('!help', 'Get help!\n\n' +
            commandsDescriptions.helpUsage())
            .addField('!gaem', 'Registers game results between two players.\n\n' +
            commandsDescriptions.gaemUsage())
            .addField('!stat', 'Displays the stats of a player.\n\n' +
            commandsDescriptions.statUsage())
            .addField('!top', 'Displays top 10 players.\n\n' +
            commandsDescriptions.topUsage());

        return embed;
    },
    "populateLoadedNotification": () => {
        let embed = unit.generateGeneric()
            .setTitle('CrevetteBot successfully loaded')
            .setDescription('I am now ready for action!\n\nType !help to see what I can do!');

        return embed;
    },
    "populateHelp": () => {
        let embed = unit.generateGeneric()
            .setTitle('CrevetteBot is handling gaming stats for you!')
            .setDescription('I am doing my best to answer your requests. Please take a look at the following commands :');

        return unit.populateCommandsDescription(embed);
    },
    "populateGaemError": (authorName, authorAvatarUrl, errors) => {
        let embed = unit.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.gaemUsage())
            .addField('Errors', errors);

        return embed;
    },
    "populateStatError": (authorName, authorAvatarUrl, errors) => {
        let embed = unit.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.statUsage())
            .addField('Errors', errors);

        return embed;
    },
    "populateTopError": (authorName, authorAvatarUrl, errors) => {
        let embed = unit.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.topUsage())
            .addField('Errors', errors);

        return embed;
    },
    "populateAdminError": (authorName, authorAvatarUrl, errors) => {
        let embed = unit.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle('Invalid request')
            .setDescription(commandsDescriptions.adminUsage())
            .addField('Errors', errors);

        return embed;
    },
    "populateNoDataForUser": (authorName, authorAvatarUrl, user) => {
        let embed = unit.generateGeneric()
            .setColor(10684167)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle(`${user} is not registered yet`);

        return embed;
    },
    "populateReport": (authorName, authorAvatarUrl,
        player1InitialEloRating, player2InitialEloRating, scoreResult) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName + ' reported a result', authorAvatarUrl)
            .setDescription(scoreResult.isDraw ?
                `Draw! : ${scoreResult.player1.score} - ${scoreResult.player2.score}` :
                `${scoreResult.winner.name} wins ${scoreResult.winner.score} - ${scoreResult.loser.score}`)
            .addField(`${scoreResult.player1.name} : (${scoreResult.player1.totalWins} wins ${scoreResult.player1.totalLosses} losses)`,
            `${scoreResult.player1.score} / ${scoreResult.totalGames}\nInitial elo rating : ${player1InitialEloRating}\nUpdated elo rating : ${scoreResult.player1.elorating}`)
            .addField(`${scoreResult.player2.name} : (${scoreResult.player2.totalWins} wins ${scoreResult.player2.totalLosses} losses)`,
            `${scoreResult.player2.score} / ${scoreResult.totalGames}\nInitial elo rating : ${player2InitialEloRating}\nUpdated elo rating : ${scoreResult.player2.elorating}`);

        return embed;
    },
    "populateUserStat": (authorName, authorAvatarUrl, userData, eloRank, ratioRank, totalPlayers) => {
        let ratio = scoresManager.calculateRatio(userData.wins, userData.losses);

        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle(`${userData.name} statistics`)
            .setDescription(`elo rating : ${userData.elorating}\nWin/loss ratio : ${ratio}`)
            .addField('Ranking', `**__elo Rank__** : ${eloRank} / ${totalPlayers}\n**__Ratio Rank__** : ${ratioRank} / ${totalPlayers}`)
            .addField('Wins', `${userData.wins} games`)
            .addField('Losses', `${userData.losses} games`)
            .addField('Total games played', `${userData.wins + userData.losses} games`);

        return embed;
    },
    "populateTop": (authorName, authorAvatarUrl, users, totalPlayers, by) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle(`Top 10 players by ${by}`)
            .setDescription(users.length === 0 ? 'There is not any player registered yet!' : 'These are the best DoWpro players');

        users.forEach((el, index) => {
            let ratio = scoresManager.calculateRatio(el.wins, el.losses);

            embed.addField(`${el.name} - ${index + 1} / ${totalPlayers}`, `${el.wins} wins / ${el.losses} losses\n` +
                `elo rating : ${el.elorating}\n` +
                `Ratio : ${ratio}`);
        });

        return embed;
    },
    "populateReplayInfos": (authorName, authorAvatarUrl,
        filesize,
        username,
        replayLocalPath, replayData) => {

        let translatedMapData = replayDataMapper.translateMapData(replayData.mapPath);

        var date = new Date(null);
        date.setSeconds(replayData.duration);
        var time = date.toISOString().substr(11, 8);

        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(`${username} uploaded a replay`, authorAvatarUrl)
            .setDescription(`**__Map__** : ${translatedMapData.name ? translatedMapData.name : 'Unregistered map'}\n**__Game duration__** : ${time}`)
            .attachFile(replayLocalPath);

        if (translatedMapData.name)
            embed.setThumbnail(translatedMapData.url);

        let slot = 1;
        let observers = [];
        replayData.players.forEach(player => {
            if (player.race.length === 0) {
                if (player.name.length > 0) observers.push(player.name);
            } else {
                embed.addField(`Player ${slot}`, `**__${player.name}__** : ${replayDataMapper.mapRace(player.race)}`);
            }
            slot++;
        });

        if (observers.length > 0) {
            embed.addField(`Observers`, `${observers.join(', ')}`);
        }

        return embed;
    },
    "populateUserStatsUpdated": (authorName, authorAvatarUrl, user) => {
        let embed = unit.generateGeneric()
            .setColor(3447003)
            .setAuthor(authorName, authorAvatarUrl)
            .setTitle(`${user.name} stats updated.`)
            .setDescription(`**__Wins__** : ${user.wins}\n**__Losses__** : ${user.losses}\n**__Elo rating__** : ${user.elorating}`);

        return embed;
    }
}