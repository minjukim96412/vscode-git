//리터럴 (literal)
//-코드에 쓰여진 값
//-모든 리터럴은 타입이 있다.

//1. 문자열 리터럴
"hello"
'hello'

//2. 객체 리터럴 (객체 = 값 = 리터값 = 연관배열)
//연관배열(association array) : 키가 문자열인 배열
const obj = {
    name : "홍길동",
    age : 20
};

//3. 숫자 리터럴
100
3.14
0

//4,배열 리터럴
[]
[1,2,3]
['hello', 'hi' ,'how are you']

//5. 불리언 리터럴
true
false

//6.정규표현식 리터럴
const regex = /abc/; //a가오고 b기 오고 c가오는 정규표현식

//7. 함수 리터럴
const add = function(a,b) { 
    return a+b;
 };

//8. null 리터럴
null