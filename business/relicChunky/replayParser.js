const fs = require ('fs');

const conversionHelper = require ('./conversionHelper.js')

module.exports = {
    "getReplayData": function(path, cb) {
        var self = this;
       
        fs.readFile(path, function(err, data) {
            let pos = 226;

            pos += conversionHelper.byteArrayToLong(data.slice(pos, pos+4))+4;
            let length = conversionHelper.byteArrayToLong(data.slice(pos, pos+4)); // length map name
            // conversionHelper.readUTF16String(data.slice(pos+4, pos+4+length*2), true);
            pos += length*2+4; 
            
            length = conversionHelper.byteArrayToLong(data.slice(pos, pos+4)); // map path length
            pos +=4; 

            let mapPath = conversionHelper.uintToString(data.slice(pos, pos+length));
            pos += length;

            pos += 16; 
            //console.log(conversionHelper.uintToString(data.slice(pos, pos+8)));
            pos += 8; // DATABASE
            pos += 32; 

            pos += 61; // game options

            length = conversionHelper.byteArrayToLong(data.slice(pos, pos+4)); // length replay name 
            // conversionHelper.readUTF16String(data.slice(pos+4, pos+4+length*2), true);
            pos += length*2+4; 

            pos += 4;

            length = conversionHelper.byteArrayToLong(data.slice(pos, pos+4)); // length win conditions
            pos += length+4;

            let mapData = {
                "mapPath": mapPath,
                "players": []
            };
            let players = [];
            for(let i = 0; i < 8; i++) {
                
                let playerChunkData = self.readPlayerChunk(data, pos);
                
                //console.log(playerChunkData);
                
                players.push(playerChunkData.playerData);
                pos = playerChunkData.nextPlayerChunkPos;
            }

            mapData.players = players;

            cb(mapData);
       });
    },
    "readPlayerChunk": function(data, pos) {
        // 46 4f 4c 44 47 50 4c 59 = FOLDGPLY
        while(true) {
            if(data[pos]   === 70 && data[pos+1] === 79 && data[pos+2] === 76 && data[pos+3] === 68 &&
            data[pos+4] === 71 && data[pos+5] === 80 && data[pos+6] === 76 && data[pos+7] === 89)
            break;

            pos++;
        }
        pos += 8;

        pos += 4;
        //console.log(data.slice(pos, pos+4));
        let foldgplyLength = conversionHelper.byteArrayToLong(data.slice(pos, pos+4));
        let foldgplyPos = pos+8;

        pos += 8;
        pos += 8; // DATAINFO
        pos += 12;
        
        length = conversionHelper.byteArrayToLong(data.slice(pos, pos+4)); // length player name
        let player = conversionHelper.readUTF16String(data.slice(pos+4, pos+4+length*2), true);

        pos += 4 + 2*length;

        pos += 4; // player type
        pos += 4; // player team

        length = conversionHelper.byteArrayToLong(data.slice(pos, pos+4)); // length player race

        pos+=4;
        let playerRace = conversionHelper.uintToString(data.slice(pos, pos+length));
        pos+=length;

        pos+=61;
        pos += 8; // FOLDTCUC

        pos += 12

        pos += 8 // DATALCIN


        // console.log(player);
        // console.log(playerRace);
        //console.log(pos);
        //console.log(foldgplyPos);
        //console.log(foldgplyLength);

        return { 
            "nextPlayerChunkPos": foldgplyPos+foldgplyLength,
            "playerData": {
                name: player,
                race: playerRace
            } 
        };
    }
}

// start at 226
// --------------------------------------------------------- game chunk
// read 4 bytes = length next value
// read length bytes
// read 4 bytes = length map name
// read length*2 bytes (map name)
// read 4 bytes = length map data (scenario\mp\*)
// read length bytes (map data)
// 4 bytes = ???
// 4 bytes = ???
// 4 bytes = ???
// 4 bytes = ???
// 8 bytes = DATABASE
// 4 bytes = ???
// 4 bytes = ???
// 4 bytes = ???
// 4 bytes = ???
// 4 bytes = slots (always 8)
// 4 bytes = ???
// 4 bytes = ??? (always 8)
// 4 bytes = ???
// (4 * 2) * 7 + 5 = 61 bytes (game options)
// 4 bytes = replay name length
// read length*2 bytes (replay name)
// 4 bytes = ???
// 4 bytes = length win conditions
// win conditions length long
// --------------------------------------------------------- player chunk
// while byte != 'F'
// followed by 'OLDGPLY'
// 4 bytes = chunk version ?
// 4 bytes = chunk length
// 4 bytes = ???
// 8 bytes = DATAINFO
// 4 bytes = ???
// 4 bytes = data info length
// 4 bytes = ???
// 4 bytes = player name length
// length bytes = player name
// 61 bytes = ???
// FOLDTCUC