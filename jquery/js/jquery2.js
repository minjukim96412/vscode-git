$(function(){
    //전체선택자 (전체 엘리먼트)
    $("*").css("background-color", "yellow");

    //id선택자
    $("#ul1").css("font-size", "30px");

    //class선택자
    $(".first").css("font-weight", "bold");

    //첫번째 ul의 첫번째 자식선택자
    $("ul li:first").css("color", "blue");
    //ul마다 첫번째 자식 선택자
    //$("ul li:first-child").css("color", "red");

    //속성선택자
    $("[href]").css("font-style", "italic");
    $("a[href='http://www.google.com']").css("font-style", "italic").css("font-size", "5em");
    $("a[href!='http://www.google.com']").css("font-style", "italic").css("font-size", "3em");


    //버튼선택자 (<input type="button"> & <button>)
    $(":button").css("border-width", "10px");
    $("input[type = 'button']").css("background-color", "violet");
    $("button").css("background-color", "gray");

    // EVEN(짝수), ODD(홀수)
    $("tr:even").css("color", "navy");
    $("tr:odd").css("color", "green");

$(function() {
    //메소드체이닝 (메소드를 연결해서 순차적으로 수행)
    $("table")
        .css("background-color", "white")
        .css("width", "100px")
        .css("height", "100px");

    //다중선택자
    $("li,a").css("text-decoration", "underline");
});














});