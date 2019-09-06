```js
@Component({
  selector: 'app-test',
  template: `
    <h2>
      Welcome {{name}}
    </h2>
    <h2>{{2+2}}</h2>
    <h2>{{"Welcom" + name}}</h2>
    <h2>{{name.length}}</h2>
    <h2>{{name.toUpperCase()}}</h2>
    <h2>{{greetUser()}}</h2>
    <h2>{{siteUrl}}</h2>
    <input type="text" value="Vishwas">
  `,
  styleUrls: []
})
export class TestComponent implements OnInit {

  public name = 'Vishwas';
  public siteUrl = window.location.href;
  constructor() { }

  ngOnInit() {
  }

  greetUser() {
    return 'Hello ' + this.name;
  }
```

# 몰랐던 점!
$0을 하면 최근 엘리먼트를 가리킨다.

# Attribute vs Property
Attributes - HTML
Properties - DOM
Attributes는 DOM 프로퍼티를 생성하고 끝난다. Attribute 값은 한 번 초기화되면 바뀌지 않는다.
Property값은 바뀔 수 있다.

```js
@Component({
  selector: 'app-test',
  template: `
    <input [id]="myId" type="text" value="Vishwas">  초기 결과는 밑과 같다.
    <input id="{{myId}}" type="text" value="Vishwas">초기 결과는 위와 같다.
  `,
  styleUrls: []
})
```
{{}}는 바인딩이 되어서 고정이 된다. []는 고정이 되지 않는다.


# Class Binding

## 동적으로 값을 주입
```yml
<h2 [class.text-danger]="hasError">Code</h2>
```
```js
public hasError = true;
```

## 동시에 두개의 값을 주입
```yml
<h2 class="text-special" [class]="successClass">Codevolution </h2>
```
class개 두개가 동시에 적용이 되진 않는다. 둘 중에 한개만 적용이 된다.