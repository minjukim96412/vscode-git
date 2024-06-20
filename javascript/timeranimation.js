let ani = null;
let speed = 5;

const clickset = function(id, direction){
    $("#" + id).click(function () {
        if (ani) cancelAnimationFrame(ani); 
        moveCat(direction);
    });
}

const speedset = function(id){
    $("#" + id).click(function () {
        if(id == "speedUp"){
            speed++;
        }else if (id == "speedDown"){
            speed = Math.max(speed - 1, 1);
        }
        console.log("Speed:", speed);
    });
}

$(function() {

    $("#pause").click(function () {
        if (ani) {
            cancelAnimationFrame(ani);
            ani = null; 
        }
    });

    clickset("moveToLeft", 'left');
    clickset("moveToRight", 'right');
    clickset("moveToTop", 'top');
    clickset("moveToBottom", 'bottom');

    speedset("speedUp");
    speedset("speedDown");


    // $("#speedUp").click(function () {
    //     speed++;
    //     console.log("Speed:", speed);
    // });

    // $("#speedDown").click(function () {
    //     speed = Math.max(speed - 1, 1); // speed는 1 이하로 내려가지 않도록 설정
    //     console.log("Speed:", speed);
    // });

    $("body").on("keydown", function(event){
        if (event.keyCode == 38) moveCat('top');
        if (event.keyCode == 40) moveCat('bottom'); 
        if (event.keyCode == 37) moveCat('left'); 
        if (event.keyCode == 39) moveCat('right');      
    });
});

function moveCat(direction) {
    const cat = $("#cat");
    const box = $("#box");
    const boxWidth = box.width();
    const catWidth = cat.width();
    const boxHeight = box.height();
    const catHeight = cat.height();
    let endLeft = parseFloat(cat.css('left')) || 0;
    let endTop = parseFloat(cat.css('top')) || 0;

    function animate() {
        if (direction === 'left' && endLeft > 0) {
            endLeft = Math.max(endLeft - speed, 0);
        } else if (direction === 'right' && endLeft < boxWidth - catWidth) {
            endLeft = Math.min(endLeft + speed, boxWidth - catWidth);
        }
        if (direction === 'top' && endTop > 0) {
            endTop = Math.max(endTop - speed, 0);
        } else if (direction === 'bottom' && endTop < boxHeight - catHeight) {
            endTop = Math.min(endTop + speed, boxHeight - catHeight);
        }
        cat.css({left: endLeft + 'px', top: endTop + 'px'});
        ani = requestAnimationFrame(animate);
    }

    animate();
}
