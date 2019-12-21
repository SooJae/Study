```ts
export class AComponent {
  @Input() o;

  // store previous value of `id`
  id;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    // every time the object changes 
    // store the new `id`
    this.id = this.o.id;
  }

  ngDoCheck() {
    // check for object mutation
    if (this.id !== this.o.id) {
      this.cd.markForCheck();
    }
  }
}
```