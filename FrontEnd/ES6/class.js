class Person {
    // constructor(생성자)
    constructor(name) {
      this.name = name;
    }
  
    sayHi() {
      console.log(`Hi! ${this.name}`);
    }
  }
  
  // 인스턴스 생성
  const me = new Person('Lee');
  me.sayHi(); // Hi! Lee
  
  console.log(me instanceof Person); // true