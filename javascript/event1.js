// event 핸들러 등록 방법

//1. html의 이벤트 속성에 등록
//<input id="btn" type="button" onclick="이벤트핸들러함수; 이벤트핸들러함수" value="눌러보삼!" />

//2. 이벤트 타겟의 이벤트속성을 자바스크립트에서 등록
// => 이벤트핸들러 1개만 가능
// document.querySelector("#btn").onclick = function() {
//     alert("눌렀삼?");
// };

//3. addEvenListner 함수를 사용
//이벤트타겟 : dociment.querySelector("#btn")
//이벤트타입 : click
//이벤트핸들러 : function(e) {}
//이벤트객체 : e

//발생한 이벤트에 대해 여러개의 이벤트핸들러 등록이 가능하다.
//이벤트팬들러를 필요에 따라 등록 및 제거하여 유연하게 처리가 가능하다.
//(발생한 이벤트에 대해서 처리하거나 처리하지 않을 수 있다)
// document.querySelector('#btn').addEventListener('click', function(e){
//     alert('눌렀삼?');
// });
// document.querySelector('#btn').addEventListener('click', function(e){
//     alert('또 눌렀삼?');
// });
// document.querySelector('#btn').addEventListener('click', function(e){
//     alert('또또 눌렀삼?');
// });

//이벤트핸들러 분리
const first = () => {alert('눌렀삼?');};
const second = () => {alert('또 눌렀삼?');};
const third = () => { alert('또또 눌렀삼?');};

//이벤트핸들러 추가
document.querySelector('#btn').addEventListener('click', first);
document.querySelector('#btn').addEventListener('click', second);
document.querySelector('#btn').addEventListener('click', third);

//이벤트핸들러 제거
document.querySelector('#btn').removeEventListener('click', second);