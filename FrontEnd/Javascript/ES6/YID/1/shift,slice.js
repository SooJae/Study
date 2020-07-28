var arr = [1, 2, 3, 4, 5];  
// 얕은 복사(shallow copy) 
// 복사하는 객체를 수정해도 원본 객체(arr)는 유지된다.
var arrCopy = arr;
arrCopy = arrCopy.slice(); 

// 깊은 복사(deep copy)
// 또는 arrCopy = JSON.parse(JSON.stringify(arr)); // arr객체를 문자열로 변환후 다시 객체로 파싱하여 새로운 객체 저장 (원소가 객체일경우 참조값이 사라지는 단점)
arrCopy.shift(); // test 첫번째 원소 삭제
console.log(arr);     // [1, 2, 3, 4, 5]
console.log(arrCopy); // [2, 3, 4, 5]