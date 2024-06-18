//성적처리 스크립트
const personArr = [];
let first = false;
$(function () {
    init();
    $("#inputBtn").click(function () { 
        if(!$("#sname").val() || !$("#skor").val() 
            || !$("#seng").val() || !$("#smath").val()) {
                alert("정보를 입력해 주세요!");
                return false;
        } else {
            const newScore = new Score(
                parseInt($("#skor").val()),
                parseInt($("#seng").val()),
                parseInt($("#smath").val())
            );
            const newPerson = new Person($("#sname").val(), newScore);
            const personArr = getPersonArr(newPerson);
            printscore(personArr, calcScore(personArr));
        }
    });
});

//데이터 초기화
function init(){

    const personArr = getPersonArr();
    printscore(personArr, calcScore(personArr));

}//init

//객체 배열 생성해서 반환
function getPersonArr(newPerson) {

    if (!first){
        //3명의 성적 객체 생성
        const hongScore = new Score(100, 90, 80);
        const kangScore = new Score(90, 80, 70);
        const leeScore = new Score(80, 70, 60);

        //3명의 학생 객체 생성
        const hong = new Person("홍길동", hongScore);
        const kang = new Person("강감찬", kangScore);
        const lee = new Person("이순신", leeScore);
        
        //newPerson이 있으면 newPerson을 포함한 personArr반환
        personArr.push(hong);
        personArr.push(kang);
        personArr.push(lee);
        first = true;
    }
    if (newPerson) {
        personArr[personArr.length] = newPerson;
    }

    return personArr;
}//getPersonArr

//성적 연산 함수
function calcScore(personArr, ) {
    const summaryArr = [0, 0, 0, 0, 0];
    const personArrLeng = personArr.length;

    personArr.forEach((personArr) => {
        summaryArr[0] += personArr.score.skor;
        summaryArr[1] += personArr.score.seng;
        summaryArr[2] += personArr.score.smath;
        summaryArr[3] += personArr.ssum;
        summaryArr[4] += personArr.savg / personArrLeng;
    });
    return summaryArr;
}//calcScore

//성적 출력 함수
function printscore(personArr, summaryArr) {
    $("tbody").empty();
    $("tfoot").empty();

    personArr.forEach((personArr, index) => {
       
        $("tbody").append(`
            <tr>
                <td>${index+1}</td>
                <td>${personArr.sname}</td>
                <td>${personArr.score.skor}</td>
                <td>${personArr.score.seng}</td>
                <td>${personArr.score.smath}</td>
                <td>${personArr.ssum}</td>
                <td>${personArr.savg}</td>
                <td>${personArr.srank}</td>
            </tr>
         `);
        });
         
    $("tfoot").append(`
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>${summaryArr[0]}</td>
        <td>${summaryArr[1]}</td>
        <td>${summaryArr[2]}</td>
        <td>${summaryArr[3]}</td>
        <td>${summaryArr[4]}</td>
        <td>&nbsp;</td>
    </tr>
    `);
}//printScore

//석차출력함수
function printRank(personArr) {
  
}