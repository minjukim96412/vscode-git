//프로토타입 (prototype)을 이용한 상속

//생성자함수
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 생성자함수를 통해 객체 생성
const person = new Person("홍길동", 20);



console.log("Person.prototype: " + Person.prototype);
console.log("person.__proto__: "+ person.__proto__);
// Person생성자함수를 통해 만들어진 peron객체의 __proto__
// 프라퍼티는 Person.prototype을 가리키게 됨
console.log(Person.prototype === person.__proto__);

//Person은 Function을 상속받는다.
console.log(Person instanceof Function);
//Person.prototype은 object를 상속받는다.
console.log(Person.prototype instanceof Function);//false
console.log(Person.prototype instanceof Object);//true

console.log(Person.prototype.__proto__ === Object.prototype);//true

// console.log(person.getName()); //error

//prototype 프라퍼티를 통한 메소드 확장
Person.prototype.getName = function() {
    return this.name;
};

//prototype 프라퍼티를 통한 프라퍼티 확장
Person.prototype.gender = '남';

console.log(person.getName());
console.log(person.gender);