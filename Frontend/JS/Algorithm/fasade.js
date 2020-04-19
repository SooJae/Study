// var Galba = (function() {
//     function Galba() {
//       this.legions = [];
//       this.legions.push(new Legion(1));
//       this.legions.push(new Legion(2));
//       this.legions.push(new Legion(3));
//     }
//     Galba.prototype.march = function() {
//       this.legions.forEach(function(legion) {
//         legion.supply();
//         legion.makeFormation();
//         legion.goForward();
//       });
//     };
//     Galba.prototype.attack = function() {
//       this.legions.forEach(function(legion) {
//         legion.makeFormation();
//         legion.pullOutSword();
//         legion.runToEnemy();
//       });
//     };
//     Galba.prototype.halt = function() {
//       this.legions.forEach(function(legion) {
//         legion.halt();
//       });
//     };
//     Galba.prototype.retreat = function() {
//       this.legions.forEach(function(legion) {
//         legion.retreat();
//       });
//     };
//     return Galba;
//   })();





//   var Legion = (function() {
//     function Legion(number) {
//       this.number = number;
//     };
//     Legion.prototype.supply = function() {
//         console.log("지원합니다");
//     };
//     Legion.prototype.makeFormation = function() {
//         console.log("포메이션");
//     };
//     Legion.prototype.goForward = function() {
//         console.log("앞으로가");
//     };

//     Legion.prototype.pullOutSword = function() {
//         console.log("전투준비");
//     };
//     Legion.prototype.runToEnemy = function() {
//         console.log("진군하라");
//     };
//     Legion.prototype.halt = function() {
//         console.log("멈춰라");
//     };
//     Legion.prototype.retreat = function() {
//         console.log("도망가");
//     };
//     return Legion;
//   })();




// var galba = new Galba();
// galba.march();
// galba.attack();


class Galba  {
    constructor() {
      this.legions = [];
      this.legions.push(new Legion(1));
      this.legions.push(new Legion(2));
      this.legions.push(new Legion(3));
    }
    march() {
      this.legions.forEach(function(legion) {
        legion.supply();
        legion.makeFormation();
        legion.goForward();
      });
    };
    attack() {
      this.legions.forEach(function(legion) {
        legion.makeFormation();
        legion.pullOutSword();
        legion.runToEnemy();
      });
    };
    halt() {
      this.legions.forEach(function(legion) {
        legion.halt();
      });
    }
    retreat() {
      this.legions.forEach(function(legion) {
        legion.retreat();
      });
    }
   
  }



  class Legion {
    constructor (number) {
      this.number = number;
    };
    supply() {
        console.log("지원합니다");
    }
    makeFormation() {
        console.log("포메이션");
    }
    goForward() {
        console.log("앞으로가");
    }

    pullOutSword() {
        console.log("전투준비");
    }
    runToEnemy() {
        console.log("진군하라");
    }
    halt() {
        console.log("멈춰라");
    }
    retreat() {
        console.log("도망가");
    }
  };




var galba = new Galba();
galba.march();
galba.attack();