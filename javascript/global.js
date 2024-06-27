//전역객체

//웹브라우저 환경에서 전역객체는 window
// node환경에서 전역객체는 global또는 globalThis

//웹브라우져 환경에서
// console.log(window);
// let x =10;//undefined
// console.log(window.x); 
//Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// var y = 10;
// console.log(window.y);//10

//node 환경에서
console.log(global);
console.log(globalThis);
console.log(global == globalThis);//true

let a = 10;
var b = 10;
//a는 global의 프라퍼티가 아니라
//global이 가지고 있는 객체의 프라퍼티가 된다.
console.log(global.a);//undefined
console.log(global.b);//undefined