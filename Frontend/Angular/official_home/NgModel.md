
# 템플릿 기반 폼 유효성 검증
|유효성 검증 상태 프로퍼티| 의미|
|---|---|
|errors	|유효성 검증에 실패한 경우, ValidationErrors 타입의 에러 객체를 반환한다. 유효성 검증에 성공한 경우, null를 반환한다.
|valid	|유효성 검증에 성공한 상태이면 true
|invalid	|유효성 검증에 실패한 상태이면 true
|pristine	|값을 한번도 입력하지 않은 상태이면 true
|dirty	|값을 한번 이상 입력한 상태이면 true
|touched	|focus in이 한번 이상 발생한 상태이면 true
|untouched	|focus in이 한번도 발생하지 않은 상태이면 true
---
### 예제
```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <input type="text"
      name="title"
      ngModel
      #title="ngModel"
      pattern="[a-zA-Z0-9]{4,10}"
      required>
      
    <p>errors:  {{ title.errors | json }}</p>
    <p>invalid: {{ title.invalid }}</p>
    <p>dirty:   {{ title.dirty }}</p>
    <p>touched: {{ title.touched }}</p>
    <p>pristine: {{ title.pristine }}</p>
  `
})
export class AppComponent {}
```
