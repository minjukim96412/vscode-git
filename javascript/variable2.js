// hoisting (호이스팅)
// 별도로 선언하지 않아도 선언문을 코드 최상단으로 끌어올려 주는 것

// var v; 엔진이 선언하지 않은 변수인  v의 선언을 코드 최상단으로 끌어올려 준다.
v = 100;
console.log(v);

//자바 스크립트는 선언(declaration)과 사용(Runtime)이 순서적으로 분리되어 실행되는 언어, 항상 선언 후에 사용


console.log(add(3,5));

function add(a,b) { 
    return a+b;
 }