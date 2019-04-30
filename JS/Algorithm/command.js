class Vitellius {
    constructor() {};
    approve(commander) {
      commander.execute();
    };
  };


  class Commander {
    constructor() {
      this.commands = [];
    }
    execute() {
      this.commands.forEach(function(command) {
        command();
      });
    }

    do(command, args) {
      this.commands.push(function() {
        command.call(null, args);
      });
    }
    undo() {
      this.commands.pop();
    };
  }
//   var strategy = {
//     climbAlps: function() {
//       console.log('알프스를 오릅니다');
//     },
//     prepareSupply: function(number) {
//       console.log('보급품을 ' + number + '만큼 준비합니다');
//     },
//     attackRome: function() {
//       console.log('로마를 공격합니다');
//     },
//   };
  var strategy = {
    climbAlps: function() {
      console.log('알프스를 오릅니다');
    },
    prepareSupply: function(number) {
      console.log('보급품을 ' + number + '만큼 준비합니다');
    },
    attackRome: function() {
      console.log('로마를 공격합니다');
    },
  };

  var vitellius = new Vitellius();
  var caecina = new Commander();
  caecina.do(strategy.prepareSupply, 5000);
  caecina.undo(); // prepareSupply 취소
  caecina.do(strategy.prepareSupply, 10000);
  caecina.do(strategy.climbAlps);
  caecina.do(strategy.attackRome);
  vitellius.approve(caecina); // 보급품을 10000만큼 준비합니다. 알프스를 오릅니다. 로마를 공격합니다.