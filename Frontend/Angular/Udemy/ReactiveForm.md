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


## html에서 여러가지 error 컨트롤 하기

```html
<span
  *ngIf="!signupForm.get(['userData','username']).valid && signupForm.get(['userData','username']).touched"
  class="help-block">
  <span
    *ngIf="signupForm.get(['userData','username']).errors['nameIsForbidden']">This name is Invalid!</span>
  <span
    *ngIf="signupForm.get(['userData','username']).errors['required']">This field is required!</span>
  </span>
</div>
```

```js
this.signupForm.statusChanges.subscribe(value => console.log(value));
```
로 하면 INVALID, VALID, PENDING(비동기 시)로 나타난다.

##SetValue, PatchValue
```js
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
        'email': 'anna@test.com'
      }
    });
```
SetValue는 폼에 맞게 다 채워 넣지 않으면 에러가 발생한다
PatchValue는 일부를 바꿀 수 있다.


## 초기값
```js
id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe?.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get RecipeFormControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
```

### 데이터를 공유하고 싶으면 공유하고 싶은 컴포넌트들이 공통으로 사용하는 모듈에 서비스를 위치시켜야 한다.

## FormArray 를 삭제하는 방법
```js
(<FormArray>this.recipeForm.get('ingredients')).clear();
```

https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/


https://nehalist.io/working-with-models-in-angular/

https://nehalist.io/angular-7-models/
