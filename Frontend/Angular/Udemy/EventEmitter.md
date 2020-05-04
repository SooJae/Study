```html
<app-recipe-item
  *ngFor="let recipeEl of recipes"
  [recipe]="recipeEl"
  (recipeSelected)="onRecipeSelected(recipeEl)"
></app-recipe-item>
```

EventEmitter의 반환함수에 $event가 아닌 recipeEl을 직접 넣는 방법이 있었구나...

```html
<div class="row">
  <div class="col-md-5">
    <app-recipe-list
    (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail></app-recipe-detail>
  </div>
</div>
```
적은 로직은 그냥 템플릿에 써도 무난하다.
