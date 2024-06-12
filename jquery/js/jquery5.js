$(function(){
    // $("#btn1").click(function () { 
    //     $("#div1").hide();
    // });

    document.getElementById("btn1").addEventListener("click", function(){
        document.getElementById("div1").style.display = "none";
    });


    // $("#btn2").click(function () { 
    //     $("#div1").show();
    // });

    document.getElementById("btn2").addEventListener("click", function(){
        document.getElementById("div1").style.display = "block";
    });

    $("#btn3").click(function () { 
        $("#div1").toggle();
    });

    $("#btn4").click(function () { 
        $("#div1").fadeIn(3000);
    });
    
    $("#btn5").click(function () { 
        $("#div1").fadeOut(3000);
    });

    $("#btn6").click(function () { 
        $("#div1").fadeToggle(3000);
    });

    $("#btn7").click(function () { 
        $("#div1").slideDown(3000);
    });

    $("#btn8").click(function () { 
        $("#div1").slideUp(3000);
    });

    $("#btn9").click(function () { 
        $("#div1").slideToggle(3000);
    });

    $("#btn10").click(function () { 
        $("#div1").animate({
            // width:"+=150px", 
            // height:"+=100px",
            height: "toggle"
        }, "fast");
    });

    $("#btn11").click(function () { 
        $("#div1").fadeOut(1000).fadeIn(500).slideUp(2000).slideDown(1000)
            .animate({width:"+=150px",height:"+=100px"});
    });

    $("#btn12").click(function () { 
        // $("#div1").fadeOut(1000);
        // alert("완료");
        $("#div1").fadeOut(2000, function(){
            alert("완료");
        });

    });

    $("#btn13").click(function () { 
        $("#div1").fadeOut(1000).fadeIn(500).slideUp(2000).slideDown(1000);
    });

    $("#btn14").click(function () { 
        // 첫번째 true :모든이펙트 중지
        // 두번쨰 true :현재이펙트는 끝까지 실행하고 중지
        $("#div1").stop(false, true);
    });

    
    

}); 

