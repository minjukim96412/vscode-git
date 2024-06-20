let speed = 5;
let ani = null;
const cat1 = $("#cat1");
const box = $("#box");
const boxWidth = box.width();
const catWidth = cat1.width();
let endLeft = parseFloat(cat1.css('left')) || 0;
$(function(){
   $("#start").on("click", function() {
    if (endLeft < boxWidth - catWidth) {
        endLeft = Math.min(endLeft + speed, boxWidth - catWidth);
    }
   });
});




