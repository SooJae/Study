var abstractCharacterFactory = (function() {
    var jobs = {};
    return {
      addJob: function(job, Character) {
        if (Character.prototype.attack) { // attack 메소드가 있어야만 등록 가능
           jobs[job] = Character;
        }
      },
      create: function(job, options) { // 등록한 직업을 바탕으로 실제 객체 생성
        var Character = jobs[job];
        return (Character ? new Character(options) : null);
      }
    };
  })();


var Emperor = (function() {
    function Emperor(options) {
        this.name = options.name;
    }
    Emperor.prototype.attack = function(target) {
        console.log(this.name + '가 ' + target + '을 공격합니다');
    };
    Emperor.prototype.proclaim = function() {
        console.log(this.name + '가 스스로를 황제라고 칭했습니다');
    };
    return Emperor;
})();

var Governor = (function() {
    function Governor(options) {
      this.name = options.name;
    }
    Governor.prototype.attack = function(target) {
      console.log(this.name + '가 ' + target.name + '을 공격합니다');
    };
    Governor.prototype.betray = function() {
      console.log(this.name + '가 황제를 배신합니다');
    };
    return Governor;
  })();


  abstractCharacterFactory.addJob('emperor', Emperor);
  abstractCharacterFactory.addJob('governor', Governor);
  var nero = abstractCharacterFactory.create('emperor', { name: 'Nero' });
  var vindex = abstractCharacterFactory.create('governor', { name: 'Vindex' });
  var galba = abstractCharacterFactory.create('governor', { name: 'Galba' });
  var otho = abstractCharacterFactory.create('governor', { name: 'otho' });
  var vitellius = abstractCharacterFactory.create('governor', { name: 'vitellius' });
  var rufus = abstractCharacterFactory.create('governor', { name: 'rufus' });  


nero.proclaim();
vindex.betray(); // vindex가 황제를 배신합니다.
galba.betray(); // galba가 황제를 배신합니다.
otho.betray(); // otho가 황제를 배신합니다.
vitellius.betray(); // vitellius가 황제를 배신합니다.