let unit = module.exports = {
  "checkGaemArgs": (args, mentionsCount) => {
    let n1 = Number.parseInt(args[1], 10);
    let n2 = Number.parseInt(args[3], 10);

    let errors = '';

    if (args.length != 4)
      errors = 'Expecting 4 arguments';
    if (isNaN(n1) || args[1].indexOf('.') !== -1 || n1 < 0)
      errors += '\nNumbers of games won for player 1 is not a positive integer';
    if (isNaN(n2) || args[3].indexOf('.') !== -1 || n2 < 0)
      errors += '\nNumbers of games won for player 2 is not a positive integer';
    if (mentionsCount != 2)
      errors += '\nArguments should contain two mentions';

    return errors;
  },
  "checkStatArgs": (args, mentionsCount) => {
    let errors = '';

    if (args.length != 1)
      errors = 'Expecting 1 argument';
    if (mentionsCount != 1)
      errors += '\nArgument should be a mention';

    return errors;
  },
  "checkTopArgs": (args) => {
    let errors = '';

    if (args.length != 1)
      errors = 'Expecting 1 argument';
    if (args[0] !== 'byratio' && args[0] !== 'byelo')
      errors += '\nargument should be either byratio or byelo';

    return errors;
  },
  "checkAdminArgs": (args, mentionsCount) => {
    let errors = '';

    if (args.length === 3) {

      let n = Number.parseInt(args[2], 10);

      if (args[0] !== 'setwins' && args[0] !== 'setlosses' && args[0] !== 'setelo')
        errors = 'Invalid sub command : expecting setwins, setlosses or setelo';
      if (mentionsCount !== 1)
        errors += '\nArguments should contain one mention';
      if (isNaN(n) || args[2].indexOf('.') !== -1 || n < 0)
        error += '\nValue is not a positive integer';

    } else if (args.length === 4) {

      let n1 = Number.parseInt(args[1], 10);
      let n2 = Number.parseInt(args[2], 10);
      let n3 = Number.parseInt(args[3], 10);

      if (mentionsCount !== 1)
        errors += 'Arguments should contain one mention';
      if (isNaN(n1) || args[1].indexOf('.') !== -1 || n1 < 0)
        error += '\nelo value is not a positive integer';
      if (isNaN(n2) || args[2].indexOf('.') !== -1 || n2 < 0)
        error += '\nWins value is not a positive integer';
      if (isNaN(n3) || args[3].indexOf('.') !== -1 || n3 < 0)
        error += '\nLosses value is not a positive integer';

    } else {
      errors = 'Invalid number of arguments';
    }

    return errors;
  }
}