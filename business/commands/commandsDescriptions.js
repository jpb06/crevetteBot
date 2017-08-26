module.exports = {
    gaemUsage: function() {
        return 'Command usage :\n'+
               '```!gaem @mention1 integer1 @mention2 integer2```\n'+
               'Where :\n'+
               '\t**__@mention1__** is player 1 discord identifier.\n'+
               '\t**__integer1__** is the number of games won by player 1.\n'+
               '\t**__@mention2__** is player 2 discord identifier.\n'+
               '\t**__integer2__** is the number of games won by player 2.\n';
    },
    statUsage: function() {
        return 'Command usage :\n'+
               '```!stat @mention```\n'+
               'Where :\n'+
               '\t**__@mention__** is the player discord identifier.\n';
    },
    topUsage: function() {
        return 'Command usage :\n'+
               '```!top```\n';
    },
    helpUsage: function() {
        return 'Command usage :\n'+
               '```!help```\n';
    }
}