let unit = module.exports = {
    "gaemUsage": () => {
        return 'Command usage :\n' +
            '```!gaem @mention1 integer1 @mention2 integer2```\n' +
            'Where :\n' +
            '\t**__@mention1__** is player 1 discord identifier.\n' +
            '\t**__integer1__** is the number of games won by player 1.\n' +
            '\t**__@mention2__** is player 2 discord identifier.\n' +
            '\t**__integer2__** is the number of games won by player 2.\n\n' +
            'Example :\n```!gaem @crab 5 @saucisse 2```\n';
    },
    "statUsage": () => {
        return 'Command usage :\n' +
            '```!stat @mention```\n' +
            'Where :\n' +
            '\t**__@mention__** is the player discord identifier.\n\n' +
            'Example :\n```!stat @crab```\n';
    },
    "topUsage": () => {
        return 'Command usage :\n' +
            '```!top (byelo or byratio)```\n\n' +
            'Example :\n```!top byelo```\n';
    },
    "helpUsage": () => {
        return 'Command usage :\n' +
            '```!help```\n';
    },
    "adminUsage": () => {
        return 'Command usage :\n' +
            '```!admin setwins @mention integer\n!admin setlosses @mention integer\n!admin setelo @mention integer```\n' +
            'Where :\n' +
            '\t**__@mention__** is the discord identifier of the player to update.\n' +
            '\t**__integer__** is either the player wins, losses or elo rating, depending on the command first argument (setwins / setlosses / setelo).\n\n' +
            '```!admin @mention integer1 integer2 integer3```\n' +
            'Where :\n' +
            '\t**__@mention__** is the discord identifier of the player to update.\n' +
            '\t**__integer1__** is the player wins.\n' +
            '\t**__integer2__** is the player losses.\n' +
            '\t**__integer3__** is the player elo rating.\n\n' +
            'Example :\n```!admin setwins @crab 5\n!admin @crab 5 2 1020```\n';
    }
}