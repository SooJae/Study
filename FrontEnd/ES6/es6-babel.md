es6를 자바스크립트에서 이용시 import 에러가 발생한다.
$ npm install --save-dev babel-cli babel-preset-es2015
$ echo '{ "presets": ["es2015"] }' > .babelrc
$ nodemon --exec babel-node reduce.js