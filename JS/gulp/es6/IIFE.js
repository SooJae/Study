// const secret = "ss";
const message = (function() {
    const secret = {vv:"I'm a secret2!"};
    return `The secret is ${secret.vv.length} characters long.`;
})();
// const message = (function() {
//     const secret = "I'm a secret!";
//     return `The secret is ${secret.length} characters long.`;
// })();

message.secret = "dddd";
console.log(message);