/*
타입 호환 (type compatability)
    좁은타입의 값이 넓은타입의 값이 되는것은 OK
    넓은타입의 값이 좁은타입의 값이 되는 것은 ERROR
 */
// 타입호환의 범위
let str4 = 'hi';
let str5 = 'hello';
// str5=str4; // hello타입이 sting타입보다 좁으므로 error
str4 = str5; // sting타입이 hello타입보다 넓으므로 ok
let i4 = { name: '홍길동' };
let i5 = { name: '강감찬' };
i4 = i5;
i5 = i4;
let i6 = { name: 20 };
let animal3 = { name: '동물' };
let dog = { name: '강아지', sound: '왈왈' };
let bird2 = { name: '새', leg: 2 };
//dog = bird2;//bird2는 sound프라퍼티를 가지고있지 않아 불가능
// bird2 = dog //dog는 leg프라퍼티를 가지고있지 않아 불가능
// dog = animal3 // animal3는 sound프라퍼티를 가지고있지 않아 불가능
// bird2 = animal3 // animal3는 leg프라퍼티를 가지고있지 않아 불가능
animal3 = bird2;
animal3 = dog;
let dog2 = { name: '강아지', sound: '왈왈' };
let bird3 = { name: '새', leg: 2 };
dog2 = bird3;
bird3 = dog2;
//함수타입의 타입 호환
let func6 = function (a, b) {
    return a + b;
};
let func7 = function (a) {
    return a;
};
func6 = func7; // func7의 a파라미터를 잃지 않는다.
// func7=func6; // func6의 b파라미터를 잃어버림
// enum 타입의 타입호환
// enum 타입은 같은 프라퍼티를 가져도 호환되지 않음 
var Enum1;
(function (Enum1) {
    Enum1[Enum1["A"] = 0] = "A";
    Enum1[Enum1["B"] = 1] = "B";
    Enum1[Enum1["C"] = 2] = "C";
})(Enum1 || (Enum1 = {}));
;
var Enum2;
(function (Enum2) {
    Enum2[Enum2["A"] = 0] = "A";
    Enum2[Enum2["B"] = 1] = "B";
    Enum2[Enum2["C"] = 2] = "C";
})(Enum2 || (Enum2 = {}));
;
let e1 = Enum1.A;
let e2 = Enum2.A;
let in1 = "안녕";
let in2 = 1;
in1 = in2;
in2 = in1;
let in3 = { data: '안녕' };
let in4 = { data: 1 };
// in3 = in4; //data : number -> string (x) error
// in4 = in3; //data : string -> number (x) error
