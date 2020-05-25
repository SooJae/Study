```html
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      formControlName="username"
      class="form-control"
    >
    <span *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
          class="help-block">Please enter a valid username!</span>
  </div>
</form>
```
해당 인풋이 터치됐지만 유효하지 않을시 위와 같이 표현하면 된다.


## FormArray
```html
<div formArrayName="hobbies">
  <h4>Your Hobbies</h4>
  <button
    class="btn btn-default"
    type="button"
    (click)="onAddHobby()">Add Hobby</button>
  <div class="form-group"
    *ngFor="let hobbyControl of controls; let i =index">
    <input type="text" class="form-control" [formControlName]="i">
  </div>
</div>
```

```js
ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
```

### 참고
```js
<input type="text" class="form-control" [formControlName]="value"> 와 
<input type="text" class="form-control" formControlName="value"> 의 차이점
```
[formControlName]="'value'" === formControlName ="value"
즉 formControlName은 스트링 값이 들어간다.


## Custom Validator
```js
forbiddenUsernames = ['Chris', 'Anna'];
...

ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }
...

 forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
```

### this.forbiddenNames.bind(this)는 뭐지?
this.forbiddenNames는 이 클래스 안에서 호출되지 않는다. Validate체크를 위해 앵귤러에서 관리하고 호출된다. this.forbiddenUsernames를 앵귤러 내에서 찾는다.
(윈도우 같은 느낌)앵귤러 내에서 this.forbiddenUsernames가 없기 때문에 자연스럽게 에러가 발생한다.
그래서 '이 클래스에서 사용해라' 라는 의미로 this.forbiddenNames.bind(this)를 쓰면, 이 타입스크립트에서 this.forbiddenUsernames.indexOf가 실행된다.
