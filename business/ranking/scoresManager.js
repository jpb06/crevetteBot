const eloRatingManager = require('./elo/eloRatingManager.js');

module.exports = {
    "player1": {},
    "player2": {},
    "winner": {},
    "loser": {},
    "isDraw": false,
    "totalGames": 0,

    "resolve": function(player1Name, player1Score, player1EloRating, 
                        player2Name, player2Score, player2EloRating) {

        this.player1 = { 
            "name": player1Name,
            "score": player1Score,
            "totalWins": 0,
            "totalLosses": 0,
            "eloRating": player1EloRating
        };
        this.player2 = {
            "name": player2Name,
            "score": player2Score,
            "totalWins": 0,
            "totalLosses": 0,
            "eloRating": player2EloRating
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
        this.calculateEloRatingsFromMultipleResults(this.player1, this.player2);
        this.calculateEloRatingsFromMultipleResults(this.player2, this.player1);

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
    },
    "calculateEloRatingsFromSingleEncounter": function() {
        let d  = this.player1.eloRating - this.player2.eloRating;
        let player1GainProbability = 1 / (1 + Math.pow(10, -d/400));

        let w = (this.winner.name === this.player1.name) ? 1 : 0;
        let k = eloRatingManager.setK(this.player1.eloRating);
        
        let points = Math.round(k * (w - player1GainProbability));

        console.log(`points : ${points}`);

        this.player1.eloRating = this.player1.eloRating + points;
        this.player2.eloRating = this.player2.eloRating - points;
    },
    "calculateEloRatingsFromMultipleResults" : function(actedUponPlayer, impactedPlayer){
        let d  = actedUponPlayer.eloRating - impactedPlayer.eloRating;
        let actedUponPlayerGainProbability = 1 / (1 + Math.pow(10, -d/400));

        let w = actedUponPlayer.score;
        let k = eloRatingManager.setK(actedUponPlayer.eloRating);

        let points = Math.round(k * (w - actedUponPlayerGainProbability));

        console.log(`points : ${points}`);
        
        actedUponPlayer.eloRating = actedUponPlayer.eloRating + points;
        impactedPlayer.eloRating = impactedPlayer.eloRating - points;
    }

}