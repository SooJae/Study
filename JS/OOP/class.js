class Person{

    constructor(name,first,second){
        this.name=name;
        this.first=first;
        this.second= second;
    }
    sum(){
        return 'prototype :  '+(this.first+this.second);
    }

    // Person.prototype.sum = function(){
    //     return 'prototype : '+(this.first+this.second+this.third);
    // }
}

class PersonPlus extends Person{
    constructor(name, first, second, third){
        super(name, first, second); //부모의 생성자 접근
        this.third = third;
    }

    sum(){
        return super.sum()+this.third;// 부모 클래스 그 자체
    }
    avg(){
        return (this.first+this.second+this.third)/3;
    }
}


var lee =new PersonPlus('lee',10,20,30);
console.log("lee.sum()", lee.sum());
console.log("lee.avg()", lee.avg());

// function Person(name,first,second,third){
//     this.name=name;
//     this.first=first;
//     this.second= second;
//     this.third= third;
    
// }