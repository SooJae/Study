"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
console.clear();
const loadingService_1 = require("./loadingService");
const loadingOverlay = document.getElementById('loading-overlay');
// const loading$ = new Subject();
// loading$.subscribe(isLoading => {
//   if(isLoading) {
//     loadingOverlay.classList.add('open');
//   } else {
//     loadingOverlay.classList.remove('open')
//   }
// });
// loading$.next(true);
// setTimeout(() => loading$.next(false), 1500);
loadingService_1.loadingService.loadingStatus$.subscribe(isLoading => {
    // if(isLoading) {
    //     loadingOverlay.classList.add('open');
    // } else {
    //     loadingOverlay.classList.remove('open')
    // }
});
loadingService_1.loadingService.showLoading();
setTimeout(() => loadingService_1.loadingService.hideLoading(), 1500);
/********************
 * Have a question, comment, or just want to chat about RxJS?
 * Ping me on Ultimate Courses slack or on
 * Twitter https://twitter.com/btroncone
 * I look forward to hearing from you!
 * For additional RxJS info and operator examples check out
 * Learn RxJS (https://www.learnrxjs.io) and
 * the Ultimate Course RxJS blog!
 * (https://ultimatecourses.com/blog/category/rxjs)
 ********************/
