/*
    이터러블(iterable)
    : 자바스크립트 객체 중에서 인덱스(키)와 length를 가진 유사배열 객체처럼
        반복시킬 수 있는 객체

    * 이터러블인 것: 배열, string, Map, Set, NodeList HTMLCollection
    * 객체는 이터러블이 아님
    * 이터러블인 경우 for ~ of 구문으로 반복시킬 수 있고,디스트럭쳐링 할당이 가능하며
        스프레드 문법(...)을 사용 할수 있음 
    * 이터러블은 Symbol.iterator 프라퍼티의 값이 Function

*/

const arr = [1,2,3];

//객체의 프라퍼티중에 Symbol.iterator가 있으면 이터러블임
console.log(Symbol.iterator in arr);//true

for (let each of arr) {
    console.log(each);//1 2 3
}

//배열은 이터러블이므로 스프레드문법 사용이 가능
console.log([...arr]);//[ 1, 2, 3 ]

//배열은 이터러블이므로 구조분해 할당이 가능
const [a, ...rest] = arr;
console.log(a, rest);//1 [ 2, 3 ]

//이터레이터 획득
const it = arr[Symbol.iterator]();

//이터레이터는 next라는 프라퍼티(메소드)를 가지고 있음
console.log('next' in it);//true

//next를 호출하여 배열내의 객체들을 추출
console.log(it.next());//{ value: 1, done: false }
console.log(it.next());//{ value: 2, done: false }
console.log(it.next());//{ value: 3, done: false }
console.log(it.next());//{ value: undefined, done: true }

//객체는 이터러블이 아님
const person = {
    name: '홍길동',
    age: 20
};
console.log('Symbol.ierator' in person);//false

for (let key in person) {
    console.log(key); //name age
}

//유사배열객체를 배열로 만들면 이터러블이 됨
const obj = {
    0:1,
    1:2,
    2:3,
    length: 3
}

const arr2 = Array.from(obj);
console.log(arr2);//[ 1, 2, 3 ]

for (let each of arr2) {
    console.log(each);//1 2 3
};