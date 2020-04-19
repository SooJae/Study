class Car{
    static getNextVin(){
        return Car.nextVin++; // this대신 Car를 앞에 쓰면 정적메서드라는 점을 알기쉽다.
    }

    constructor(make, model){
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }

    static areSimilar(car1, car2){
        return car1.make === car2.make && car.model === car2.model;
    }
    static areSame(car1, car2){
        return car1.vin === car2.vin;
    }
    toString() {
        return `${this.make} ${this.model} : ${this.vin}`;
    }
}

class InsurancePolicy {}
function makeInsurable(o) {
    o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
    o.getInsurancePolicy = function() { return this.insurancePolicy; }
    o.isInsured = function() { return !!this.insurancePolicy; }
}

//makeInsurable(Car); error
const car1 = new Car();
makeInsurable(car1);
car1.addInsurancePolicy(new InsurancePolicy()) //works