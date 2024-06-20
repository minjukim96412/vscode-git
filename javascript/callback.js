//콜백함수 (callback function)

//1. 이벤트리스너 (event listner) = 이벤트콜백 = 이벤트핸들러
// javascript
//load이벤트에 대한 콜백함수
/*
// window.onload = function() {
window.addEventListener('load', function() {


    //click이벤트에 대한 콜백함수 1)
    // document.getElementById("btn").onclick = function () {
    //     document.getElementById("result").innerHTML =
    //         document.getElementById("txt").value;
    // };

    //click이벤트에 대한 콜백함수 2)
    document.getElementById("btn").addEventListener('click', function(){
        document.getElementById("result").innerHTML =
            document.getElementById("txt").value;
    });
    document.getElementById("btn").addEventListener('click', function(){
        alert('버튼이 클릭됨');
    });

});
// };
*/

// jquery
//load이벤트 콜백
/*
$(function () {
    // click이벤트 콜백
    $("#btn").click(function () { 
        console.log('1');
    });
    $("#btn").click(function () { 
        $("#result").html($("#txt").val());
    });

    $("#btn").on("click", function () { 
        console.log('2');
    });
});
*/

//2.AJAX 콜백함수
/*
window.onload = function(){
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send();
    //readystatechane 이벤트 콜백함수
    // xhr.onreadystatechange = function() {
    //     if(xhr.readyState==4 && xhr.status==200){
    //         document.getElementById("result").innerHTML 
    //             = xhr.responseText;
    //     }
    // };

    xhr.addEventListener('onreadystatechange', function() {
        if(xhr.readyState==4 && xhr.status==200){
            document.getElementById("result").innerHTML 
                = xhr.responseText;
        }
    });

   
};
*/
 // jquery
//  $(function(){
//     $.ajax({
//         method: "GET",
//         url: "https://jsonplaceholder.typicode.com/posts",
//         success: function (result) {
//             $("#result").html(JSON.stringify(result));
//         }
//     });
// });

//axios

// const axios = require('axios').default;
// axios.get('https://jsonplaceholder.typicode.com/posts')
//     .then(function (response) {
//         $("#result").html(JSON.stringify(response));
//     });
// axios.get('https://jsonplaceholder.typicode.com/posts')
//     .then(function (response) {
//         // 응답 데이터를 예쁘게 JSON 문자열로 변환하여 HTML 요소에 표시
//         $("#result").html(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
//     })
//     .catch(function (error) {
//         // 오류가 발생할 경우 처리
//         console.error('Error fetching data:', error);
//         $("#result").html("Error fetching data");
//     });
    
//3. timing function
//setTimeOut : 특정시간 후에 콜백 수행
//setInterval : 특정 시간 간격으로 콜백 수행

//1) setTimeout(callback, milliseconds)
// $(function() {
//     setTimeout(cbfunc);
// });
// const cbfunc = function () {
//     console.log("cbfunc수행됨!");
// }

//2) setInterval (callback, milliseconds)
// let count = 0;
// let timer = null;
// $(function() {
//     timer = setInterval(cbfunc, 1000);
// });
// const cbfunc = function () {
//     console.log(`cbfunc ${++count}번 수행됨!`);
//     if(count == 5) {
//         clearInterval(timer);
//     }
// }

//타이머멈춰 버튼 클릭시 타이머 멈추도록
let count = 0;
let timer = null;
$(function() {
    timer = setInterval(cbfunc, 1000);
    $("#stop").click(function () { 
        clearInterval(timer);
    });
    $("#start").click(function () { 
        timer = setInterval(cbfunc, 1000);
    });

});
const cbfunc = function () {
    console.log(`cbfunc ${++count}번 수행됨!`);
}
    