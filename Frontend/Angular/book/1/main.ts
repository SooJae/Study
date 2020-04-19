import { Component } from '@angular/core'; // 애플리케이션 실행에 필요한 패키지를 로드한다.
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from 'angular/platform-browser-dynamic';

@Component({ // 이 클래스를 Angular 컴포넌트로 만든다.
    selector: 'hello-world',
    template : '<h1>Hello{{name}}!</h1>'
})

class HelloWorldComponent{
    name:string;

    constructor(){
        this.name = 'Angular';
    }
}

@NgModule({                     // 모듈을 정의한다.
    imports : [BrowserModule],
    declarations : [HelloWorldComponent],
    bootstrap : [HelloWorldComponent]
})


export class AppModule{} // 모듈로 사용할 클래스를 선언
//부트스트랩
platformBrowserDynamic().bootstrapModule(AppModule) // 모듈을 브라우저에 로드한다.