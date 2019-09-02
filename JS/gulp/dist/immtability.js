"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var v = 1; //1억 줄~

v = 2;
console.log('v : ', v);
var c = 1; //1억 줄~

c = (_readOnlyError("c"), 2);