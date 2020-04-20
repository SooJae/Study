"use strict";

function addPrefix(prefix) {
    var prefixedWords = [];

    for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        prefixedWords[i] = prefix + (i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
    }
    
    return prefixedWords;
}
addPrefix("con", "verse", "vex");