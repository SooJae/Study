class Person{
    constructor(name){
        this.name = name;
        this.id = Person.nextId++;
    }
}

Person.nextId = 0 ;
const jamie = new Person("Jamie"),
juliet = new Person("Juliet"),
peter = new Person("Peter"),
jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

// 옵션 1 : ID를 직접 비교하는 방법
console.log(arr.find(p=> p.id === juliet.id)); // juliet 객체

// 옵션 2 : "this" 매개변수를 이용하는 방법
console.log(arr.find(function(p) {
    return p.id === this.id
},juliet)); // juliet 객체
