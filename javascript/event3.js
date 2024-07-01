//이벤트 전파 (event propagation)

// - 이벤트가 발생하면 
// - 상위엘리먼트에서 이벤트 타겟으로 이벤트가 캡처링 됨 (capturing phase)
// - 이벤트 타겟에 이벤트가 전달됨 (target phase)
// - 타겟에서 상위엘리먼트로 이벤트가 버블링 됨  (bubbling phase => 3)

$("#outer").click(function (e) { 
    printEventInfo(e);
});
//캡쳐링 단계에서 이벤트 처리를 하려면 addEventListner 세번째 인자를 true로
$("#outer").click(true,function (e) { 
    printEventInfo(e);
});

$("#inner").click(function (e) { 
    printEventInfo(e);
});
$("#inner").click(true,function (e) { 
    printEventInfo(e);
});

$("#btn").click(function (e) { 
    printEventInfo(e);
    e.stopPropagation();//이벤트 전파 중단 (버블링 금지)
});
$("#btn").click(true,function (e) { 
    printEventInfo(e);
});

const printEventInfo = (e) => {
    console.log("이벤트 target : " + e.target);
    console.log("이벤트 currentTarget : " + e.currentTarget);
    console.log("이벤트 currentTargetID : " + e.currentTarget.id);
    console.log("이벤트 phase : " + e.eventPhase);
    console.log("\n");
}
