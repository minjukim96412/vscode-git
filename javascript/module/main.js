// main.js
//전역스코프

var x = 1;
let y = 2;
const z = 3;
const func = () => {
    console.log('main.js');
}

console.log(x);
console.log(y);
console.log(z);
func();

