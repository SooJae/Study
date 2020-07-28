헤드 : 브라우저에 절대 나타나지 않는 요소
바디 : 보통 브라우저에 나타나는 요소

\<sciprt> 태그는 헤드에 넣으면 성능이 떨어지고, 헤드가 지나치게 복잡해지므로 바디 마지막에 넣습니다.
```js
$(document).ready(function(){});

//바른 습관을 들이기 위해, 브라우저 기반 자바스크립트를 만들 때마다 이렇게 하도록 합니다.?
```

```js
<canvas id ="mainCanvas"></canvas>
```
id : 한 페이지당 하나씩만 써야합니다.

## 템플릿(포일러 플레이트)
어떤 일을 하기 전에 항상 먼저 실행해야 하는 코드를 보통 라고 부릅니다.

## 비동기적 이벤트

사용자의 입력은 항상 비동기적이라는 사실에 익숙해져야 합니다.
비동기적 이벤트란 **이벤트가 언제 일어날지 프로그래머가 전혀 알 수 없는 이벤트**를 말합니다. 예) 사용자의 클릭, 사용자의 입력

## 자바스크립트 개발도구
- 깃 : 프로젝트가 커져도 쉽게 관리할 수 있고 다른 개발자와 협력할 수 있게 돕는 버전 컨트롤 도구
- 노트 : 브라우저 밖에서 자바스크립트를 실행할 수 있게 하는 도구입니다.
- 걸프 : 반복적인 개발 작업을 자동화하는 빌드 도구입니다. **그런트**도 널리 쓰입니다.
- 바벨 : ES6코드를 ES5코드로 변환해줍니다.
- ES린트 : 자주 하는 실수를 피하고 더 나은 프로그래머가 되도록 돕는 린트 프로그램

자바스크립트 : 컴파일과 링크가 필요없는 인터프리팅 언어
(노드같은 자바스크립트 엔진은 컴파일을 하긴 하지만, 프로그래머가 개입할 필요없이 자동으로 이루어진다.)

### npm 디버그 기록
npm-debug.log

### 프로젝트 의존성
node_modules

## NPM
설치된 패키지 관리.
'패키지'는 완전한 애플리케이션일수도 있고, 코드 샘플일 수도 있고, 프로젝트에서 사용할 모듈 또는 라이브러리일수도 있다.

```
$ npm install underscore (특정버젼시 @x.x.x을 붙인다)
```
설치된 위치 : node_modules

설치하는 모듈이 늘어나면 모듈을 **추적**하고 **관리**할 방법이 필요합니다. 프로젝트에 설치하고 사용하는 모듈을 **의존성**이라 부릅니다.

```
$ npm init
```
# 의존성 
- 일반 의존성 
- 개발 의존성 : 앱을 실행할때틑 필요 X, 프로젝트를 개발할때 필요 O

로컬 패키지를 설치할 때 --save 또는 --save-dev 플래그를 사용합니다. (사용하지 않을 시 package.json 파일에 등록이 되지 않습니다.)


빌드도구 : 걸프와 그런트 

걸프 설치
```
$ npm install -g(전역 이라는 뜻) gulp
```
다른사람이 관리하는 시스템을 사용한다면, sudoers 파일에 추가요청을 해야합니다.

프로젝트마다 로컬 걸프가 필요하므로, 프로젝트 루트에서 `npm install --save-dev gulp` 명령을 실행합니다. 걸프는 최종 사용자에게는 필요 없지만, 개발 과정에서 도움이 되는 개발 의존성에 속합니다.

```js
const gulp = require('gulp');
// 걸프 의존성을 여기 씁니다.

gulp.task('default', function(){
// 걸프 작업을 여기 씁니다.
});
```

## 걸프 개발 환경
### 프로젝트 루트
```yml
.git # git
.gitignore

package.json #npm
node_modules

es6 #노드소스
dist

public/ # 브라우저 소스
    es6/
    dist/
```

## 트랜스 컴파일러
- 바벨
- 트레이서

```yml
$ npm install --save-dev @babel/preset-env
```

### .babelrc
```yml
{"presets":["@babel/preset-env"]}
```
이 파일이 있으면 프로젝트에서 바벨을 사용할 때 @babel/preset-env를 사용한다는 것을 인식하게 됩니다.

```yml
$ npm install --save-dev gulp-babel
```

## 바벨을 걸프와 함께 사용하기
gulpfile.js
```js
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default' , function(){
//노드 소스
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
//브라우저 소스
    gulp.src("public/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
});
```
es6/a.js 파일은 dist/a.js로 컴파일 되고, es6/a/b/c.js 파일은 dist/a/b/c.js로
컴파일 되는 식입니다. 같은 과정을 public/es6 디렉터리의 파일에 대해서도 반복합니다.

# 린트
보푸라기라는 뜻입니다.
```yml
$ npm install -g eslint
```

## .eslinttrc 파일 만들기
```yml
$ eslint --init
```

Gulpfile에 ESLint를 추가
```yml
npm install --save-dev gulp-eslint
```

## 요약 
- 노드 소스용 서브 디렉토리 es6
- 브라우저 소스용 서브 디렉토리 public/es6

```js
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
//
gulp.task('default' , function(callback){
//ESLint를 실행합니다.
    gulp.src(["es6/**/*.js","public/es6/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format());
//노드 소스
    gulp.src("es6/**/*.js")
        .pipe(babel({
            presets:["@babel/preset-env"]
        }))
        .pipe(gulp.dest("dist"));
//브라우저 소스
    gulp.src("public/es6/**/*.js")
        .pipe(babel({
            presets:["@babel/preset-env"]
        }))
        .pipe(gulp.dest("public/dist"));

    callback();
});
```

```yml
//오류
[22:08:20] The following tasks did not complete: default
[22:08:20] Did you forget to signal async completion?
```
callback을 사용하면 됩니다.

해결 : https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async