const eloRatingManager = require('./elo/elorating.manager.js');

let unit = module.exports = {
    "player1": {},
    "player2": {},
    "winner": {},
    "loser": {},
    "isDraw": false,
    "totalGames": 0,

    "resolve": (player1Name, player1Score, player1EloRating, player2Name, player2Score, player2EloRating) => {

        unit.player1 = {
            "name": player1Name,
            "score": player1Score,
            "totalWins": 0,
            "totalLosses": 0,
            "elorating": player1EloRating
        };
        unit.player2 = {
            "name": player2Name,
            "score": player2Score,
            "totalWins": 0,
            "totalLosses": 0,
            "elorating": player2EloRating
        };
        unit.totalGames = player1Score + player2Score

        if (player1Score > player2Score) {
            unit.winner = {
                "name": player1Name,
                "score": player1Score
            };
            unit.loser = {
                "name": player2Name,
                "score": player2Score
            };
        } else if (player1Score < player2Score) {
            unit.winner = {
                "name": player2Name,
                "score": player2Score
            };
            unit.loser = {
                "name": player1Name,
                "score": player1Score
            };
        } else {
            unit.isDraw = true;
        }
        unit.calculateEloRatingsFromMultipleResults(unit.player1, unit.player2);
        unit.calculateEloRatingsFromMultipleResults(unit.player2, unit.player1);

        return unit;
    },
    "calculateRatio": (wins, losses) => {
        let ratio;
        if (wins === 0) {
            ratio = 0;
        } else if (losses === 0) {
            ratio = 100;
        } else {
            ratio = Math.round(((wins / (wins + losses)) * 100) * 100) / 100;
        }
        return ratio;
    },
    "calculateEloRatingsFromSingleEncounter": () => {
        let d = eloRatingManager.calculateD(unit.player1.elorating, unit.player2.elorating);
        let player1GainProbability = 1 / (1 + Math.pow(10, -d / 400));

        let w = (unit.winner.name === unit.player1.name) ? 1 : 0;
        let k = eloRatingManager.setK(unit.player1.elorating);

        let points = Math.round(k * (w - player1GainProbability));

        console.log(`points : ${points}`);

        unit.player1.elorating = unit.player1.elorating + points;
        unit.player2.elorating = unit.player2.elorating - points;
    },
    "calculateEloRatingsFromMultipleResults": (actedUponPlayer, impactedPlayer) => {
        let d = eloRatingManager.calculateD(actedUponPlayer.elorating, impactedPlayer.elorating);
        let actedUponPlayerGainProbability = 1 / (1 + Math.pow(10, -d / 400));

        let w = actedUponPlayer.score;
        let k = eloRatingManager.setK(actedUponPlayer.elorating);

        let points = Math.round(k * (w - actedUponPlayerGainProbability));

        //console.log(`points : ${points}`);

        actedUponPlayer.elorating = actedUponPlayer.elorating + points;
        impactedPlayer.elorating = impactedPlayer.elorating - points;
    }
}