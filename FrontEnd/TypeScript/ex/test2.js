"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(constructorFn) {
    /*
     *  클래스를 꾸며주는 로직
     *  Componbent Html, CSS
     *
     *
     */
    return constructorFn;
}
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    __decorate([
        Input()
    ], AppComponent.prototype, "height", void 0);
    AppComponent = __decorate([
        Component()
    ], AppComponent);
    return AppComponent;
}());
