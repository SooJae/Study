var kim = {name:'kim', first:10, second:20}
var lee = {name:'kim', first:10, second:10}

function sum(){
    //this = kim
    return this.first + this.second;
}

function sum2(prefix){
    //this = kim
    return prefix+(this.first + this.second);
}

//sum();
console.log("sum.call(kim)",sum2.call(kim, '=> ')); // sum이라는 객체를 실행합니다는 뜻
//모든 함수는 call이라고하는 메소드를 갖고있다. 
console.log("sum.call(lee)", sum2.call(lee,': '));

//call(this값을 무엇으로 할 것인가, 추가될 인자값)

var kimSum = sum2.bind(kim,'-> ');
console.log('kimSum()',kimSum());

console.log('leeSum()', sum2.bind(lee,' : ')());