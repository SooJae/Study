
```ts
export class Ingredient {
  constructor(public name: string, public amount: number) {}
}

// 아래와 같다.

export class Ingredient {
    public name: string;
    public amount: number;
    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
```

