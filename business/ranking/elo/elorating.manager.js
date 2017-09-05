let unit = module.exports = {
    "setK": (elorating) => {
        // Players below 2100: K-factor of 32 used
        // Players between 2100 and 2400: K-factor of 24 used
        // Players above 2400: K-factor of 16 used.

        let k;

        if (elorating < 2100) k = 32;
        else if (elorating >= 2100 && elorating < 2400) k = 24;
        else k = 16;

        return k;
    },
    "calculateD": (elorating1, elorating2) => {
        // capping d at 400

        let d = elorating1 - elorating2;
        if (Math.abs(d) > 400) {
            return d > 0 ? 400 : -400;
        }

        return d;
    }
}