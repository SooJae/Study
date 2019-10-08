package.json


devDependencies
"@types/jquery": "^3.3.29",를 포함하지 않으면 에러가 발생한다

fetch -> 헤드값만 갖고오고 싶을때 (데이터 없이)
branch바꿀때 사용!

"@types/lodash": "^4.14.123",

로대쉬 : 각종 기능이 있다 네임 스페이스 기능이나 _기능 등등


tslint에 air bnb 규칙을 적용하고 싶다면



### tslint.json
```json
{
  "extends": "tslint-config-airbnb",
  "rules": {
    "max-line-length": [],
    "trailing-comma": false,
    "no-var-self": false
  }
}

```
다음과 같이 확장하면 된다.

출처 : https://pravusid.kr/javascript/2019/03/10/eslint-prettier.html\


swagger에서는 데이터를 모두 넣어야 작동한다.\


상태 Css 관련해서 사용하고 싶다면 getActionCss를 첨부하자