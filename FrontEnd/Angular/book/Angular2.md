 # yarn으로 Angular 프로젝트 시작하기
 0 . $ npm install -g yarn
 1 . yarn init -y

package.json을 실수로 저장소에 배포하지 않도록 "private" : true 항목을 추가한다.
그리고 프로젝트의 설명을 적는 description 항목을 작성하고 scripts 항목도 빈 항목으로 추가한다. 이제 package.json 파일은 다음과 같다.
```js
{
  "name": "5.angular-seed",
  //주석처리한 것은 지워야 한다.
  // "version": "1.0.0",
  // "main": "index.js",
  // "license": "MIT"
  "description" : "An initial yarn-managed project for Chapter 2",
  "private" : true,
  "scripts": {
    "start" : "live-server"
  },
  "dependencies" : {
    "@angular/common" : "^4.1.0",
    "@angular/compiler" : "^4.1.0",
    "@angular/core" : "^4.1.0",
    "@angular/forms" : "^4.1.0",
    "@angular/http" : "^4.1.0",
    "@angular/platform-browser" : "^4.1.0",
    "@angular/platform-browser-dynamic" : "^4.1.0",
    "@angular/router" : "^4.1.0",
    "core-js" : "^2.4.1",
    "rxjs" : "5.3.0",
    "systemjs" : "0.19.47",
    "zone.js" : "0.8.5",
    "bootstrap" : "^3.3.7",
    "jquery" : "^3.2.1"
  },
  "devDependencies" : {
      "live-server" : "1.2.0",
      "typescript" : "^2.3.3"
  }
}
```
npm run \[스크립트명] 형식으로 실행할 수 있다.
yarn은 더더욱 생략해도 된다. node_modules/.bin 폴더에 추가되는 쉘 스크립트도 yarn \[스크립트명]으로 실행할 수 있다.

3 . $ yarn install

완료!

systemjs.config.js
```js
System.config({
    transpiler : "typescript",

    typescriptOptions : {
        emitDecoratorMetadata : true,
        target : 'ES5',
        module : 'commonjs'
    },

    map: {
        '@angular' : 'node_modules/@angular',
        'rxjs' : 'node_modules/rxjs'
    },
    packages : {
        'rxjs' : { main : 'Rx'},
        '@angular/core' : {main : 'bundles/core.umd.min.js'},
        '@angular/common' : {main: 'bundles/common.umd.min.js'},
        '@angular/compiler' : {main : 'bundles/compiler.umd.min.js'},
        '@angular/platform-browser' : {main : 'bundles/platform-browser.umd.min.js'},
        '@angular/platform-browser-dynamic' : {main : 'bundles/platform-browser-dynamic.umd.min.js'},
        'app' : {main : 'main', defaultExtension : 'ts'}
    }
});
```

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Angular seed project</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="node_modules/typescript/lib/typescript.js"></script>
        <script src="node_modules/core-js/client/shim.min.js"></script>
        <script src="node_modules/zone.js/dist/zone.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="systemjs.config.js"></script>
        <script>
            System.import('app').catch(function(err) {console.log(err);});
        </script>
    </head>
    <body>
        <app>Loading....</app>
    </body>
</html> 
```



Angular 패키지에 있는 소스코드를 사용하지 않고, 번들링된 버전을 사용했다. 번들링된 코드는 원래 있던 소스 코드를 압축해서 크기를 줄였다.
SystemJS 설정파일의 package 항목에서는 app이라는 이름으로 스크립트 파일들의 진입점을 main.ts로 매핑하고 있기 때문에 index.html 파일에서 System.import(app)이라고 사용하면 main.ts파일을 불러온다.