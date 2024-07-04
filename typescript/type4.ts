/*
타입 호환 (type compatability)
    좁은타입의 값이 넓은타입의 값이 되는것은 OK
    넓은타입의 값이 좁은타입의 값이 되는 것은 ERROR
 */

// 타입호환의 범위
let str4: string = 'hi';
let str5: 'hello' = 'hello';
// str5=str4; // hello타입이 sting타입보다 좁으므로 error
str4=str5; // sting타입이 hello타입보다 넓으므로 ok

//구조적 타이핑 (structural typing)
//타입이 무엇인지가 중요한 것이 아니라 타입이 가지는 
//프로퍼티명과 프로퍼티의 타입이 중요!!

interface I4 {
    name: string;
}
interface I5 {
    name: string;
}

let i4:I4 = {name: '홍길동'};
let i5:I5 = {name: '강감찬'};

i4 = i5; 
i5 = i4;

interface I6 {
    name: number;
}

let i6:I6 = {name: 20}

// i4 = i6; error
// 15 = 16; error

//객체간 타입 호환
//할당받는 측의 타입을 만족해야 호환
interface Animal3 {
    name: string;
}

interface Dog {
    name: string;
    sound: string;
}

interface Bird2 {
    name: string;
    leg: number;
}

let animal3: Animal3 = {name: '동물'};
let dog: Dog = {name: '강아지', sound: '왈왈'};
let bird2: Bird2 = {name: '새', leg: 2};
//dog = bird2;//bird2는 sound프라퍼티를 가지고있지 않아 불가능
// bird2 = dog //dog는 leg프라퍼티를 가지고있지 않아 불가능
// dog = animal3 // animal3는 sound프라퍼티를 가지고있지 않아 불가능
// bird2 = animal3 // animal3는 leg프라퍼티를 가지고있지 않아 불가능
animal3 = bird2;
animal3 = dog;

//옵셔널을 활용한 타입호환
interface Dog2 {
    name: string;
    sound?: string;
}
interface Bird3 {
    name: string;
    leg?: number;
}

let dog2: Dog2 = {name: '강아지', sound: '왈왈'};
let bird3: Bird3 = {name: '새', leg: 2};

dog2 = bird3;
bird3 = dog2;

//함수타입의 타입 호환
let func6 = function(a:number, b:number): number {
    return a+b;
}
let func7 = function(a:number): number {
    return a;
}
func6=func7; // func7의 a파라미터를 잃지 않는다.
// func7=func6; // func6의 b파라미터를 잃어버림

// enum 타입의 타입호환
// enum 타입은 같은 프라퍼티를 가져도 호환되지 않음 
enum Enum1 {A,B,C};
enum Enum2 {A,B,C};
let e1: Enum1 = Enum1.A;
let e2: Enum2 = Enum2.A;
//e1 = e2;
//e2 = e1;

//제네릭의 타입 호환
//제네릭은 트랜스파일 타임이 아니라 실행타임에
// 타입체크가 가능하므로 트랜스파일시에는 에러가 안남(에러를 찾을 수 없음)
interface In1<T> {
    
}
let in1:In1<string> = "안녕";
let in2:In1<number> = 1;
in1 = in2;
in2 = in1;
interface In2<T> {
    data: T
}
let in3:In2<string> = {data: '안녕'};
let in4:In2<number> = {data: 1};
// in3 = in4; //data : number -> string (x) error
// in4 = in3; //data : string -> number (x) error

