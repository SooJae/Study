"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const store = new store_1.ObservableStore({
    user: 'brian',
    isAuthenticated: false
});
store.selectState('user').subscribe(console.log);
store.updateState({
    user: 'joe'
});
store.updateState({
    isAuthenticated: true
});
