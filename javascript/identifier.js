// 식별자 (Identifier)
// 프로그래밍에서 사용하는 서로를 구분짓는 유일한 이름
// ex) 변수명, 함수명 ...

function func() { 
    console.log("func");
 }

 let f = func;

 f();

 //예약어 (reserved word) : function, let
 //식별자 (identifier) : func, console, log, f
 //리터럴 (literal) : "func", function func() {console.log("func");}

 console.log(this);
 console.log(func());//함수 실행 결과
 console.log(func);//함수 자체
 console.log(f);

 //실습 : 아래 코드에서 예약어, 식별자, 리터럴, 연산자를 구분해 보세요!

const c1 = 100;
const c2 = 200;
let l1 = c1 + c2;

function f1(a, b) { 
    return a + b;
 }

 const f2 = function(a, b) {
    return a * b;
 }

 console.log('f1 수행결과 : ' + f1(3, 5));
 console.log('f2 수행결과 : ' + f1(2, 4));

//예약어 (reserved word) : const, function, let, return
//식별자 (identifier) : c1, c2, l1, f1, f2, a, b, console, log
//리터럴 (literal) : 100,200,function f1(a, b) { return a + b;}, function(a, b) {return a * b;}, 
                    // 'f1 수행결과 : ','f2 수행결과 : '
//연산자 : +, *, =