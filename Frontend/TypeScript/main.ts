export {}
let message = 'Welcome back';
console.log(message);

let x = 10;
const y = 20;

//let x =30; //error

const title = 'Codevolution';

let isbeginner: boolean = true;
let total: number = 0;
let name: string ="soojae";
name = true;

let sentence : string = `My name is ${name}`;
console.log(sentence);

enum Color {Red, Green, Blue};
let c: Color = Color.Green;
console.log(c);


function add(num1: number, num2?: number): number{
    return num1 + num2;
}

console.log(add(5,10));
console.log(add(5));


class Employee{
    employeeName: string;

    constructor(name: string){
        this.employeeName = name;
    }

    greet(){
        console.log(`Good Morning ${this.employeeName}`);
    }
}

let employee = new Employee('SooJae');
console.log(employee.employeeName);
employee.greet();

class Manager extends Employee {
    constructor(managerName: string){
        super(managerName);
    }
    delegateWork(){
        console.log(`Manager tasks`);
    }
}

let m1 = new Manager('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);