var name = '이름이 없습니다.';
function displaySoojae() {
  var name = '수재';
  var age = 28;
  
  console.log(`My name is ${name}`);
  console.log(`I was born in ${new Date().getFullYear() - age}`);
}

function displayJunbeom(){
  var name ='준범';
  var age = 29;
  
  console.log(`My name is ${name}`);
  console.log(`I was born in ${new Date().getFullYear() - age}`);
}

{
  var name = '블록 스코프입니다.';
}


// My name is 수재
// I was born in 1992
displaySoojae();  

// My name is 준범
// I was born in 1992
displayJunbeom();  

console.log(name); //  name is not defined