var kim ={
    name:'kim',
    first:10,
    second : 20,
    sum : function(f,s){
        return this.first+this.second;
        //this : 메서드가 자신이 속해있는 객체를 가리킴
    }
}

//console.log(kim.sum(kim.first,kim.second));
console.log(kim.sum());

