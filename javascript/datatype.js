// 데이터 타입 (Data Type)

//1. 숫자 (number)
const num1 = 100;
const num2 = 0b0001;
const num3 = 0o777;
const num4 = 0xFBFF;
const num5 = Infinity;
const num6 = -Infinity;
const num7 = NaN;
console.log(num1);
console.log(num2);
console.log(num3);
console.log(num4);
console.log(num5);
console.log(num6);
console.log(num7);

//2. 문자열 (string)
const str1 = "hello";
const str2 = 'hello';
const str3 = `hello`;
const str4 = `hello`;
const str5 = 'javascript';
const str6 = `${str4} ${str5}`;
console.log(str1);
console.log(str2);
console.log(str3);
console.log(str4);
console.log(str5);
console.log(str6);

//3. 불리언 (boolean)
const bool1 = true;
const bool2 = false;
console.log(typeof bool1, typeof bool2);

//4. undifiend -> java의경우, 초기화없이 값을 사용할 수 없기 때문에 undifiend를 사용하지 않음
//초기화 되지 않았다는 값
//타입이기도 하고 유일한 값이기도 하다.
var v; //engine
let l;  //engine
const c = undefined; //developer
console.log(v, typeof v);
console.log(l, typeof l);
console.log(c, typeof c);

//5. null
// 값이 없다는 값
//null은 타입이기도 하고 유일한 값이기도 하다.
var v1 = null; //null로 초기화 되었으나 값이 없음
let l1 = null;
const c1 = null;
console.log(v1, typeof v1); //object
console.log(l1, typeof l1);
console.log(c1, typeof c1);

//동적 타이핑 (Dynamic typing)
//변수에 값이 할당될 때 변수의 타입이 정해짐
let vv = 100; 
console.log(typeof vv);
vv = 'hello';
console.log(typeof vv);
vv = false;
console.log(typeof vv);
vv = function() {
    console.log('hello');
};
console.log(typeof vv);
vv = [1,2,3];
console.log(typeof vv);
vv = {name: '홍길동', age:30};
console.log(typeof vv);
vv = /abc/g;
console.log(typeof vv);

// instanceof 연산자 : 객체의 타입을 조사
const vvv = new RegExp();
console.log(typeof vvv);
console.log(vvv instanceof RegExp);

//Object, Array, Function, RegExp 객체와 리터럴
//리터럴 표기법으로 코딩을 하면 
//내부에서 객체생성자 표기법으로 자동변환되어 실행
const obj1 = new Object(); //객체생성자 표기법
const obj2 = {};    //리터럴 표기법
const arr1 = new Array();//객체생성자 표기법
const arr2 = [];   //리터럴 표기법
const func1 = new Function();//객체생성자 표기법
const func2 = function() {};   //리터럴 표기법
const re1 = new RegExp();//객체생성자 표기법
const re2 = /abc/;   //리터럴 표기법

console.log(typeof new Object());
console.log(typeof {});