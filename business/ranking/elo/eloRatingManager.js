module.exports = {
    setK: function(eloRating) {
        // Players below 2100: K-factor of 32 used
        // Players between 2100 and 2400: K-factor of 24 used
        // Players above 2400: K-factor of 16 used.

        let k;
        if(eloRating < 2100) k = 32;
        else if(eloRating >= 2100 && eloRating < 2400) k = 24;
        else k = 16;

        return k;
    }
}