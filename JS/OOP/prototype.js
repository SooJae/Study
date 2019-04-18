function Person(name,first,second,third){
    this.name=name;
    this.first=first;
    this.second= second;
    this.third= third;
    
}


Person.prototype.sum = function(){
    return 'prototype : '+(this.first+this.second+this.third);
    //객체를 만들때마다 사용하지 않고, 한번만 실행되기 때문에 성능이 증가한다. 메모리도 절약된다.
    //Share하는 느낌임
    //함수는 일반적으로 prototype을 사용한다.
}


var kim = new Person('kim',10,20,30);
kim.sum = function(){
    return 'modified : '+ (this.first+this.second+this.third);
}// 얘가 prototype보다 우선순위 높음
var lee = new Person('lee',10,10,10);

console.log("kim.sum()",kim.sum());
console.log("lee.sum()",lee.sum());
