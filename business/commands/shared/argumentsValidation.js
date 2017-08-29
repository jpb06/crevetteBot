module.exports = {
    CheckGaemArgs: function(args, mentionsCount) {
        let n1 = Number.parseInt(args[1], 10);
        let n2 = Number.parseInt(args[3], 10);
    
        let errors = '';
        
        if(args.length != 4)
          errors = 'Expecting 4 arguments';
        if(isNaN(n1) || args[1].indexOf('.') !== -1 || n1 < 0)
          errors += '\nNumbers of games won for player 1 is not a positive integer';
        if(isNaN(n2) || args[3].indexOf('.') !== -1 || n2 < 0)
          errors += '\nNumbers of games won for player 2 is not a positive integer';
        if(mentionsCount != 2)
          errors += '\nArguments should contain two mentions';
    
        return errors;
    },
    CheckStatArgs: function(args, mentionsCount){
      let errors = '';
      
      if(args.length != 1)
        errors = 'Expecting 1 argument';
      if(mentionsCount != 1)
        errors += '\nArgument should be a mention';

      return errors;
    },
    CheckTopArgs : function(args) {
      let errors = '';
      
      if(args.length != 1)
        errors = 'Expecting 1 argument';
      if(args[0] !== 'byratio' && args[0] !== 'byelo')
        errors += '\nargument should be either byratio or byelo';

      return errors;
    }
}