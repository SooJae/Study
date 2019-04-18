var memberArray=['egoing', 'graphitte', 'sujae']
var i = 0;

console.group('array loop')
while(i<memberArray.length){
    console.log(i , memberArray[i]);
    i++;
}
console.groupEnd('end loop')
var memberObject ={
    manager:'egoing',
    developer:'graphittie',
    designer:'leezhce'
}

console.group('object loop')
for(var name in memberObject){
    console.log(name, memberObject[name]);
}
console.groupEnd('object loop')
