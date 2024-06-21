let speed = 1;
let count = 1;
const frameNumbers = {
    skateboard: 0,
    blueCat: 0,
    rabbit: 0,
    man: 0,
    lion: 0
};

$(function () {
    $("#start").click(function () {
        moveCat("skateboard");
        moveCat("blueCat");
        moveCat("rabbit");
        moveCat("man");
        moveCat("lion");
    });
});

const moveCat = function (ele) {
    const cat = $("#" + ele);
    const box = $("#box");
    const boxWidth = box.width();
    const catWidth = cat.width();
    let endLeft = parseFloat(cat.css('left')) || 0;
    let ani = null;
    let startTime = null;
    let frameCount = 0; 

    const animate = function (timestamp) {
        if (!startTime) startTime = timestamp; 
        const racingTime = (timestamp - startTime)*0.001; 
        if (frameCount % 5 === 0) {
            speed = parseInt(Math.random() * 1000+2)%13;
            if(frameCount % 15 === 0) speed = parseInt(Math.random() * 1000+2)%11;
            if (endLeft < boxWidth - catWidth) {
                endLeft = Math.min(endLeft + speed, boxWidth - catWidth);
                cat.css({ left: endLeft + 'px' });
                updateImage(ele); 
            } else {
                cancelAnimationFrame(ani);
                if(ele == "skateboard"){ele = "보드소년";}
                if(ele == "blueCat"){ele = "파란고양이";}
                if(ele == "rabbit"){ele = "토끼";}
                if(ele == "man"){ele = "런닝맨";}
                if(ele == "lion"){ele = "사자";}
                $("#timeTable").append("<div>" + count + "등 " + ele + " <br /> 소요시간 : " + racingTime.toFixed(4) + "s</div>");
                count++;
                if(count > 5) rank();
                return;
            }
            console.log(ele + " : "+speed + " : "+Date.now());
        }
        frameCount++;
        ani = requestAnimationFrame(animate);
    }
    ani = requestAnimationFrame(animate);
}

const updateImage = function (ele) {
    if (ele === "skateboard" || ele === "blueCat") {
        frameNumbers[ele] = (frameNumbers[ele] % 6) + 1;
    } else if (ele === "rabbit" || ele === "man" || ele === "lion") {
        frameNumbers[ele] = (frameNumbers[ele] % 8) + 1;
    }
    const imgPath = `images/${ele}/${ele}${frameNumbers[ele]}.png`;
    $("#" + ele).attr("src", imgPath);
}

const rank = function () { 
    let results = $("#timeTable").html();
    Swal.fire({
        title: "경기 결과",
        html: results,
        showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
        }
    });
    $("#start").attr("id", "restart");
    $("#restart").attr("value", "다시시작!");
    $("#restart").click(function () {
        window.location.reload();
    });
}
