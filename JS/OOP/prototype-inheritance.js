var superObj = {superVal:'super'}


//var subObj = {subVal:'sub'}
//subObj.__proto__ = superObj; //subObj는 superObj의 자식이라는 뜻

var subObj = Object.create(superObj); //superObj를 부모로하는 subObj (extends와 같음)
subObj.subVal ='sub';

debugger; //자바스크립트를 일시중지함


console.log('subObj.subVal =>',subObj.subVal);
console.log('subObj.superVal =>',subObj.superVal);
subObj.superVal = 'sub'; //객체를 바꾸는거지, 객체의 proto를 바꾸는게 아님
console.log('superObj.superVal =>', superObj.superVal);

//__proto__의 값만 바꾸면 그 객체는 다른 객체의 자식이 된다. ( 유연하다 )


//수작업으로 객체 만들기
var kim={
    name : 'kim',
    first : 10, second : 20 ,
    sum:function(){
        return this.first+ this.second
    }
}

// var lee = {
//     name:'lee',
//     first : 10,
//     second: 10,
//     avg: function(){
//         return (this.first+this.second)/2;
//     }
// }

// lee.__proto__ = kim;

var lee =Object.create(kim); // 위의 방법보다 이 방법이 권장됨
lee.name ='lee';
lee.first = 10;
lee.second = 10;
lee.avg = function(){
    return (this.first+this.second)/2;
}

console.log('kim.sum()', kim.sum());
console.log('lee.sum()', lee.sum());
console.log('lee.avg()', lee.avg());

