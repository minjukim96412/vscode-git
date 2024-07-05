//todo4.ts을 패키지로 바꾸기
//원격서버의 JSON 사용
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let todos4 = [];
function fetchJson2() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error('Error : ' + response.statusText);
        }
        else {
            return yield response.json();
        }
    });
}
fetchJson2()
    .then(function (response) {
    return __awaiter(this, void 0, void 0, function* () {
        todos4 = yield response;
        todos4 = todos4.map(todo4 => todo4 = { id: todo4.id,
            title: todo4.title, completed: todo4.completed }).splice(0, 5);
    });
})
    .then(() => {
    //목록
    console.log(todo4PKG.getTodos4());
    //등록
    todo4PKG.registTodo4({ id: 6, title: 'ts공부중', completed: true });
    console.log(todo4PKG.getTodos4());
    //수정
    todo4PKG.updateTodo4({ id: 6, title: '야식먹기', completed: false });
    console.log(todo4PKG.getTodos4());
    //한건 조회
    console.log(todo4PKG.getTodo4(4));
    //삭제
    todo4PKG.deleteTodo4(4);
    console.log(todo4PKG.getTodos4());
});
const todo4PKG = {
    getTodos4: function () {
        return todos4;
    },
    getTodo4: function (paramId) {
        return (todos4.filter(todo4 => todo4.id === paramId))[0];
    },
    registTodo4: function (paramTodo) {
        if (!this.isExistedTodo4(paramTodo.id)) {
            todos4.push(paramTodo);
        }
    },
    updateTodo4: function (paramTodo) {
        const id = paramTodo.id;
        //id에 해당하는 todo가 존재하면 
        if (this.isExistedTodo4(id)) {
            todos4 = [...this.deleteTodo4(id), paramTodo];
        }
        return todos4;
    },
    //삭제
    deleteTodo4: function (paramId) {
        if (this.isExistedTodo4(paramId)) {
            todos4 = todos4.filter(todo4 => todo4.id != paramId);
        }
        return todos4;
    },
    //id 존재여부 확인
    isExistedTodo4: function (paramId) {
        //입력받은 number에 해당하는 todo.id가 있으면 true 리턴
        return todos4.some(todo4 => todo4.id === paramId);
    }
};
