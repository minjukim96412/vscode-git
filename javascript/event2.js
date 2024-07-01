// event 객체의 프라퍼티

document.querySelector("#btn").addEventListener("click", function(e){
    console.log("이벤트타겟 : " + e.target);//이벤트타겟 : [object HTMLInputElement]
    console.log("이벤트currentTarget : " + e.currentTarget);//이벤트currentTarget : [object HTMLInputElement]
    console.log("이벤트phase : " + e.eventPhase);//이벤트phase : 2
    console.log("이벤트타입 : " + e.type);//이벤트타입 : click
});

document.querySelector("#btn").addEventListener("mouseover", function(e){
    console.log("이벤트타겟 : " + e.target);//이벤트타겟 : [object HTMLInputElement]
    console.log("이벤트currentTarget : " + e.currentTarget);//이벤트currentTarget : [object HTMLInputElement]
    console.log("이벤트phase : " + e.eventPhase);//이벤트phase : 2
    console.log("이벤트타입 : " + e.type);//이벤트타입 : mouseover
});

// 디폴트이벤트 방지
document.querySelector("a").addEventListener("click", function(e){
   e.preventDefault();
});

//폼내의 input엘리먼트에 입력된 값에 따라 submit을 수행
$("form").submit(function (e) { 
    e.preventDefault();
    const txtval = $("#txt").val();
    if(txtval && txtval.length > 5) {
        this.submit();
    }else {
        alert('값을 5글자 이상 입력해 주세요!');
        return false;
    }
});