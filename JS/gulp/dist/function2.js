"use strict";

function f(o) {
  o.message = "f에서 수정함";
  o = {
    message: "새로운 객체!"
  };
  console.log("f\uB0B4\uBD80 : o.message =\"".concat(o.message, "\"(\uD560\uB2F9 \uD6C4)"));
}

var o = {
  message: "초기 값"
};
console.log("f\uB97C \uD638\uCD9C\uD558\uAE30 \uC804 : o.message=\"".concat(o.message, "\""));
f(o);
console.log("f\uB97C \uD638\uCD9C\uD55C \uB2E4\uC74C : o.message=\"".concat(o.message, "\""));