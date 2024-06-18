//기본타입, 참조타입 복사

//기본타입 복사
//값 자체가 복사됨, 값 2개
let message = "HELLO";
let message_cp = message;
console.log(message);
console.log(message_cp);

message_cp = "Hi";
console.log(message);
console.log(message_cp);

//참조타입 복사
//참조값만 복사됨, 참조값 1개 객체 1개
const hong = { name: "홍길동" };
const hong_cp =  hong;
console.log(hong.name);
console.log(hong_cp.name);

hong_cp.name = "강감찬";
console.log(hong.name);
console.log(hong_cp.name);

//a와b가 가리키는 객체가 같은 객체
let a = {};
let b = a;
console.log(a==b);
console.log(a===b);

//a와b가 가리키느 객테가 다른 객체
let a2 = {};
let b2 = {};
console.log(a2==b2);
console.log(a2===b2);

// shallow copy, 객체 복제, 객체 2개
//Object.assign(빈객체, 복사할객체)
let user = {
    name: "유관순",
    age: 30
};
let user_clone = Object.assign({},user);
user_clone.name = "이순신";
console.log(user.name);
console.log(user_clone.name);
console.log(user==user_clone);
console.log(user===user_clone);

//lodash를 활용한 deep copy
var _ = require('lodash');
var Objects = [{'a':1},{'b':2}];

var shallow = _.cloneDeep(Objects);
console.log(shallow[0]===Objects[0]);