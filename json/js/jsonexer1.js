window.onload = function() {
 
    //JSON에서 사용하는 Javascript의 데이터타입
    const obj = {}; // object
    const arr = []; // array
    const str = ""; //String
    const num = 0; //number
    const bool = false; //boolean
    const nul = null; //null

    const result = document.getElementById("result");

    //JSON object  객체
    const person = {
        "name": "홍길동",
        "age" : 20,
        "gender" : "M",
        "married": false
    };

    //객체가 될 수 있는 문자열
    // {
    //     "name": "홍길동",
    //     "age" : 20,
    //     "gender" : "M",
    //     "married": false
    // }

    person.age = 30;

    result.innerHTML = person.name + ", " + person.age + ", " +
        person.gender + ", " + person.married;

    //JSON array
    const persons = [
        {"name" : "강감찬", "age" : 60},
        {"name" : "장보고", "age" : 30},
        {"name" : "이순신", "age" : 70}
    ];
    persons[1] = {"name" : "권율", "age" : 80};
    result.innerHTML = persons[1].name + ", " + persons[1].age;
    
    const personsLeng = persons.length;
    let printStr = "";
    for (let i = 0; i< personsLeng; i++) {
        printStr += persons[i].name + ", " + persons[i].age + "<br />";      
    }

    result.innerHTML = printStr;

    //json형태의 문자열
    const jsonObjStr = '{"name" : "홍길동", "age" : 20}';
    result.innerHTML = jsonObjStr;

    //json object
    const jsonObj = eval("("+jsonObjStr+")");
    result.innerHTML = jsonObj.name;

    //JSON object를 JSON 문자열로
    const jsonStr = JSON.stringify(jsonObj);
    result.innerHTML = jsonStr;















}