function ShoppingList() {
  this.groceries = [];
}

ShoppingList.prototype.addItem = function (item) {
  this.groceries = this.groceries.concat([item]);
  // this.groceries.push(item)은 사용하면 안된다.(push를 사용하면 배열의 메모리 참조는 변경되지 않기때문에)
  // 새로운 배열이 생성되지 않기 때문에.
  //https://chrislo.ca/angular-2345-change-detection-on-data-bound-array-pushunshift-popshift-or-splice/
};

ShoppingList.prototype.removeItem = (item: any) => {
  this.groceries = this.groceries.filter((grocery: any) => item !== grocery);
}

const mylist = new ShoppingList();

mylist.addItem('Apple');
mylist.addItem('banana');

mylist.removeItem('banana');
console.log(mylist.groceries);

class ShoppingList2 {
  public groceries: string[];

  constructor() {
    this.groceries = [];
  }

  addItem(item: string) {
    this.groceries = [...this.groceries, item]
  }

  removeItem(item: any) {
    this.groceries = this.groceries.filter((grocery) => item !== grocery);
  }
}

const myNewList = new ShoppingList2();

myNewList.addItem('Pear');
myNewList.addItem('Pizza');

console.log(myNewList);
