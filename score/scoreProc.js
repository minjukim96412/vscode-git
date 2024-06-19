// Person 객체 생성자 함수
function Person(sname, score) {
    this.sname = sname; //이름
    this.score = score; //성적(국어, 영어, 수학)
    this.ssum = score.skor + score.seng + score.smath;  //총점
    this.savg = this.ssum / 3;    //평균
    this.srank = 1; //석차
    this.originalIndex = null; // 원래 인덱스
}

// Score 생성자 함수
function Score(skor, seng, smath) {
    this.skor = skor;   //국어  
    this.seng = seng;   //영어
    this.smath = smath; //수학
}

// 성적처리 스크립트
const personArr = [];
let first = false;
$(function () {
    init();
    $("#inputBtn").click(function () { 
        if (!$("#sname").val() || !$("#skor").val() 
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

// 데이터 초기화
function init(){
    const personArr = getPersonArr();
    printscore(personArr, calcScore(personArr));
}

// 객체 배열 생성해서 반환
function getPersonArr(newPerson) {
    if (!first) {
        // 3명의 성적 객체 생성
        const hongScore = new Score(100, 90, 80);
        const kangScore = new Score(90, 80, 70);
        const leeScore = new Score(80, 70, 60);

        // 3명의 학생 객체 생성
        const hong = new Person("홍길동", hongScore);
        const kang = new Person("강감찬", kangScore);
        const lee = new Person("이순신", leeScore);
        
        // newPerson이 있으면 newPerson을 포함한 personArr 반환
        personArr.push(hong);
        personArr.push(kang);
        personArr.push(lee);
        first = true;
    }
    if (newPerson) {
        personArr.push(newPerson);
    }

    return personArr;
}

// 성적 연산 함수
function calcScore(personArr) {
    const summaryArr = [0, 0, 0, 0, 0];
    const personArrLeng = personArr.length;

    personArr.forEach((person) => {
        summaryArr[0] += person.score.skor;
        summaryArr[1] += person.score.seng;
        summaryArr[2] += person.score.smath;
        summaryArr[3] += person.ssum;
        summaryArr[4] += person.savg / personArrLeng;
    });
    return summaryArr;
}

// 성적 출력 함수
function printscore(personArr, summaryArr) {
    // 석차 계산
    calculateRank(personArr);
    
    // 원래 순서로 복원
    personArr.sort((a, b) => a.originalIndex - b.originalIndex);
    
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
                <td>${personArr.savg.toFixed(2)}</td>
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
        <td>${summaryArr[4].toFixed(2)}</td>
        <td>&nbsp;</td>
    </tr>
    `);
}

// 석차 계산 함수
function calculateRank(personArr) {
    // 원래 인덱스 저장
    personArr.forEach((person, index) => {
        person.originalIndex = index;
    });

    // 총점을 기준으로 내림차순 정렬
    personArr.sort((a, b) => b.ssum - a.ssum);
    
    // 석차를 부여
    personArr.forEach((person, index) => {
        person.srank = index + 1;
    });
}
