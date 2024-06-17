//식별자의 스코프(scope = 참조범위 = 유효범위)

//1. 전역스코프 (global scope)
let global = 'global'; //파일 전역에서 참조가능
var global_var = "gloval var"; // 파일변수


//2. 블록스코프 (block scope)
{
    let block = "block";//블록 밖에서는 block변수 참조 불가
    var block_var = "block var"; //전역변수
}

//3. 함수스코프 (function scope)
function func(a,b) { 
    var func_var = "func_var";
    let sum = a + b;//함수 밖에서는 sum 참조 불가
    return sum;
 }

console.log(global);
console.log(global_var);
console.log(block_var);// var로 선언하면 블록스코프를 가지지 않음



 //블록안에서 var로 선언하면 블록스코프를 가지지 않고
 //전역스코프를 가진다.