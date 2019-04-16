function Person(name,first,second,third){
    this.name=name;
    this.first=first;
    this.second= second;
    this.third= third;
    this.sum = function(){
        return this.first+this.second+this.third;
        //this : 메서드가 자신이 속해있는 객체를 가리킴
    }
}
var kim = new Person('kim',10,20,30);
var lee = new Person('lee',10,10,10);

//console.log(kim.sum(kim.first,kim.second));
console.log("kim.sum()",kim.sum());
console.log("lee.sum()",lee.sum());

var d1 = new Date('2019-4-10');
console.log("d1.getFullYear()", d1.getFullYear());
console.log("d1.getMonth()", d1.getMonth());

console.log('Date',Date);


console.log('Person()', Person()); // 일반적인 함수
console.log('new Person()', new Person()); // 객체를 생성하는 생성자(constructor)