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
        $("#start").prop("disabled", true);
    });

    $(document).on('keydown', function (e) {
        if (e.key === ' ') {
            e.preventDefault();
            const rabbit = $("#rabbit");
            rabbit.data("move", true);
        }
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
        const racingTime = (timestamp - startTime) * 0.001;
        if (ele !== "rabbit") {
            if (frameCount % 5 === 0) {
                speed = parseInt(Math.random() * 1000 + 2) % 15;
                if (frameCount % 3 === 0) speed = parseInt(Math.random() * 1000 + 2) % 13;
                if (endLeft < boxWidth - catWidth) {
                    endLeft = Math.min(endLeft + speed, boxWidth - catWidth);
                    cat.css({ left: endLeft + 'px' });
                    updateImage(ele);
                } else {
                    cancelAnimationFrame(ani);
                    appendResult(ele, racingTime);
                    return;
                }
            }
        } else {
            if (cat.data("move")) {
                cat.data("move", false);

                if (endLeft < boxWidth - catWidth) {
                    endLeft = Math.min(endLeft + 12, boxWidth - catWidth);
                    cat.css({ left: endLeft + 'px' });
                    updateImage(ele);
                } else {
                    cancelAnimationFrame(ani);
                    appendResult(ele, racingTime);
                    return;
                }
            }
        }
        frameCount++;
        ani = requestAnimationFrame(animate);
    };

    ani = requestAnimationFrame(animate);
};

const updateImage = function (ele) {
    if (ele === "skateboard" || ele === "blueCat") {
        frameNumbers[ele] = (frameNumbers[ele] % 6) + 1;
    } else if (ele === "rabbit" || ele === "man" || ele === "lion") {
        frameNumbers[ele] = (frameNumbers[ele] % 8) + 1;
    }
    const imgPath = `images/${ele}/${ele}${frameNumbers[ele]}.png`;
    $("#" + ele).attr("src", imgPath);
};

const appendResult = function (ele, racingTime) {
    const animalNames = {
        skateboard: "보드소년",
        blueCat: "파란고양이",
        rabbit: "player",
        man: "런닝맨",
        lion: "사자"
    };
    const result = '<div id="' + ele + 'time' + '">'
        + count + "등 " + animalNames[ele] + " <br /> 소요시간 : " 
        + racingTime.toFixed(4) + "s</div>";
    $("#timeTable").append(result);
    
    // 토끼가 1등으로 들어왔는지 확인
    if (ele === "rabbit" && count === 1) {
        $("#timeTable").data("winner", "rabbit");
    }
    
    count++;
    if (count > 5) rank();
};

const rank = function () {
    let results = $("#timeTable").html();
    if ($("#timeTable").data("winner") === "rabbit") {
        Swal.fire({
            title: "You Win!",
            html: results,
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "You Lose...",
            html: results,
            icon: "error"
        });
    }
    
    $("#start").prop("disabled", false);
    $("#start").attr("id", "restart");
    $("#restart").attr("value", "다시시작!");
    $("#restart").click(function () {
        window.location.reload();
    });
};
