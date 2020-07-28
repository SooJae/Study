// let f;
// {
//     let o = {note : "Safe"};
//     f = function(){
//         return o;
//     }
// }

// console.log(f());
// let oRef = f();
// oRef.note = "Not so safe after all!";
// console.log(oRef);

let f;
{
    let o = {note : "Safe"};
    f = function(){
        return o;
    }
}

console.log(f());
let oRef = f();
oRef.note = "Not so safe after all!";
console.log(oRef);