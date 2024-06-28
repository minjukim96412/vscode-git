//스프레드 문법 (spread syntax) : ES6

console.log(...[1,2,3]);//1 2 3
console.log(...'hello');//h e l l o
// console.log(...{name:'홍길동, age:20'}); - 객체는 이터러블이 아니므로 스프레드 문법 사용 불가

// rest parameter와 스프레드 문법
const print = function(...rest) { // rest paramerter
    console.log(rest);
};
print(...[1,2,3]);//스프레드 문법 [ 1, 2, 3 ]

// 스프레드의 결과는 값이 아니므로 구조분해할당에 사용할수 없음
const [a,b,c,arr] = [1,2,3,4,5];
// const [a,b,c,arr] = ...[1,2,3,4,5]; error
console.log(a,b,c,arr);//1 2 3 4