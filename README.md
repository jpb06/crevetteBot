# Crevette bot

This is a simple bot for dowpro discord server. It can handle players stats using commands, and is able to read replay game recordings using the relicChunky format.

## Features

### Commands

#### !help

Displays the commands available.

#### !gaem

Registers game results between two players.

![!gaem errors](http://i.imgur.com/fbcpHG5.jpg "!gaem errors")
![!gaem result](http://i.imgur.com/zNFLtP7.jpg "!gaem command result")

#### !stat

Displays the statistics of a player.

![!stat errors](http://i.imgur.com/OmbTXTm.jpg "!stat errors")
![!stat result](http://i.imgur.com/MQhImqs.jpg "!stat command result")

#### !top

Displays top ten players either by elo rating or by win/loss ratio.

![!top errors](http://i.imgur.com/mB7c01P.jpg "!top errors")
![!top result](http://i.imgur.com/rhx2cWn.jpg "!top command result")

### Replays parsing

Automatically parses uploaded files to a defined channel. If files are relic chunky replay files, extract data from them and generates a replay description.

![Replay parsing](http://i.imgur.com/wGHr3BG.jpg "Replay parsing")