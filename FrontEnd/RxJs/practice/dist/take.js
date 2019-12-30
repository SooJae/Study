"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
function (button) {
    var buttonClicks = rxjs_1.fromEvent(button, "click");
    // Use take() to listen for only one button click
    // and unsubscribe.
    buttonClicks.
        // Insert take() call here
        forEach(function (clickEvent) {
        alert("Button was clicked once. Stopping Traversal.");
    });
}
