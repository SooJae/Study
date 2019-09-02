"use strict";

var x = 0,
    y = 10,
    z; // z = x++, y++;

z = (x++, y++);
console.log(z);