const u1 = {name: 'Cynthia'};
const u2 = {name: 'Jackson'};
const u3 = {name: 'Olive'};
const u4 = {name: 'James'};

const userRoles = new Map();

//set() 메서드는 체인으로 연결할수도 있습니다.
userRoles
    .set(u1, 'User')
    .set(u2, 'User')
    .set(u3, 'Admin');


console.log("1번");
for(let u of userRoles.keys()) console.log(u.name);
console.log("2번");
for(let r of userRoles.values()) console.log(r);
console.log("3번");
for(let ur of userRoles.entries()) console.log(`${ur[0].name}: ${ur[1]}`);
console.log("4번");
// 맵도 분해할 수 있습니다.
for (let [u, r] of userRoles.entries()) console.log(`${u.name}:${r}`);
console.log("5번");
//entries() 메서드는 맵의 기본 이터레이터입니다.
//다시 한번 단축합니다.
for(let [u, r] of userRoles) console.log(`${u.name}:${r}`);