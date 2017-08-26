module.exports = {
    "player1": {},
    "player2": {},
    "winner": {},
    "loser": {},
    "isDraw": false,
    "totalGames": 0,

    "resolve": function(player1Name, player1Score, player2Name, player2Score) {

        this.player1 = { 
            "name": player1Name,
            "score": player1Score,
            "totalWins": 0,
            "totalLosses": 0
        };
        this.player2 = {
            "name": player2Name,
            "score": player2Score,
            "totalWins": 0,
            "totalLosses": 0
        };
        this.totalGames = player1Score + player2Score

        if(player1Score > player2Score) {
            this.winner = {
                "name": player1Name,
                "score": player1Score
            };
            this.loser = {
                "name": player2Name,
                "score": player2Score
            };
        } else if (player1Score < player2Score) {
            this.winner = {
                "name": player2Name,
                "score": player2Score
            };
            this.loser = {
                "name": player1Name,
                "score": player1Score
            };
        } else {
            this.isDraw = true;
        }
        return this;
    },
    "calculateRatio": function(wins, losses){
        let ratio;
        if(wins === 0) {
            ratio = 0;
        } else if(losses === 0) {
            ratio = 100;
        } else {
            ratio = Math.round(((wins / (wins + losses)) * 100) * 100) / 100;
        }
        return ratio;
    }
}