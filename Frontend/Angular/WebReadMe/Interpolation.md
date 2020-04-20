# {{}}를 이용하여 동적인 템플릿 만들기

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
    <h2>{{a = 2+2}}</h2> /////////////////ERROR! 전역변수 X
    <h2>{{window.location.href}}</h2> ////ERROR! 전역변수 X
    <h2>{{siteUrl}}</h2> /////////////////이런식으로 사용하면 된다.
  `,
  styleUrls: []
})
export class TestComponent implements OnInit {
  public siteUrl = window.location.href; // 여기에 프로퍼티를 생성해줘야한다.
  public name = "Vishwas";
  constructor() { }

  ngOnInit() {
  }

}
```

