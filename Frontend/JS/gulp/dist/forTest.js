"use strict";

// const player = {name : 'Thomas', rank :'Midshipman',age:25};
// for(let prop in player){
//     if(!player.hasOwnProperty(prop)) continue;
//     console.log(prop + ': ' + player[prop]);
// }
var hand = [4, 5, 6];

for (var _i = 0, _hand = hand; _i < _hand.length; _i++) {
  var face = _hand[_i];
  console.log("you rolled ... ".concat(face));
}