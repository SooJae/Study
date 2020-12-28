
[로더 적용 순서](https://joshua1988.github.io/webpack-guide/concepts/loader.html#%EB%A1%9C%EB%8D%94-%EC%A0%81%EC%9A%A9-%EC%88%9C%EC%84%9C) 는 오른쪽에서 왼쪽으로 간다.

#### 예
```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader']
    }
  ]
}
```
Sass 로 전처리 (scss파일을 css파일로 변환) 한 다음에 웹팩에서 CSS파일을 인식할 수 있게 CSS로더를 적용하는 코드


플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성입니다. 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 됩니다.

```js
// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
```

HtmlWebpackPlugin : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
ProgressPlugin : 웹팩의 빌드 진행율을 표시해주는 플러그인

### 자주 사용하는 플러그인
split-chunks-plugin
clean-webpack-plugin
image-webpack-loader
webpack-bundle-analyzer-plugin


Entry 속성은 웹팩을 실행할 대상 파일. 진입점
Output 속성은 웹팩의 결과물에 대한 정보를 입력하는 속성. 일반적으로 filename과 path를 정의
Loader 속성은 CSS, 이미지와 같은 비 자바스크립트 파일을 웹팩이 인식할 수 있게 추가하는 속성. 로더는 오른쪽에서 왼쪽 순으로 적용
Plugin 속성은 웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성. 웹팩 변환 과정 전반에 대한 제어권을 갖고 있음

위 속성 이외에도 resolve, devServer, devtool 속성에 대해 알고 있으면 좋습니다.
