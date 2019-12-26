"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("1sec");
    }, 1000);
});
timeoutPromise.then(console.log);
const util_1 = __importDefault(require("./util"));
const value = util_1.default(1, 2);
console.log(value);
//# sourceMappingURL=hello.js.map