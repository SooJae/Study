function f(o){
    o.message = "f에서 수정함";
    o = {
        message:"새로운 객체!",
    };
    console.log(`f내부 : o.message ="${o.message}"(할당 후)`);
}

let o = {
    message:"초기 값",
};

console.log(`f를 호출하기 전 : o.message="${o.message}"`);
f(o);
console.log(`f를 호출한 다음 : o.message="${o.message}"`);
