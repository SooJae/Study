const bruce = {name :"Bruce"};

function update(birthYear, occupation){
    this.birthYear = birthYear;
    this.occupation = occupation;
}

//bruce가 태어난 해를 항상 1949로 고정하지만, 직업은 자유롭게 바꿀 수 있는 업데이트 함수
const updateBruce1949 = update.bind(bruce,1949);
updateBruce1949("singer, songwriter"); //bruce는 이제 {name : "bruce", birthYear:1949, occupation : "singer, songwriter"} 입니다.

console.log(bruce);