// todo2.ts
//패키지 개념을 도입
let todos2 = [
    { id: 1, title: '아침먹기', completed: true },
    { id: 2, title: 'TS공부', completed: true },
    { id: 3, title: '점심먹기', completed: false }
];
//패키지로 사용할 객체를 생성
const todoPKG = {
    getTodos: function () {
        return todos2;
    },
    //조회
    getTodo: function (paramId) {
        //id에 해당하는 todo객체를 추출하여 리턴
        return (todos2.filter(todo => todo.id === paramId))[0];
    },
    registTodo: function (paramTodo) {
        //id가 존재하면 todos2배열에 새로운 todo를 삽입
        if (!this.isExistedTodo(paramTodo.id)) {
            todos2.push(paramTodo);
        }
    },
    updateTodo: function (paramTodo) {
        const id = paramTodo.id;
        if (this.isExistedTodo(id)) {
            todos2 = [...this.deleteTodo(id), paramTodo];
        }
        return todos2;
    },
    //삭제
    deleteTodo: function (paramId) {
        //id에 해당하는 todo가 존재하면
        if (this.isExistedTodo(paramId)) {
            todos2 = todos2.filter(todo => todo.id != paramId);
        }
        return todos2;
    },
    //id 존재여부 확인
    isExistedTodo: function (paramId) {
        //입력받은 number에 해당하는 todo.id가 있으면 true 리턴
        return todos2.some(todo => todo.id === paramId);
    }
};
//목록
console.log(todoPKG.getTodos());
//한건 조회
console.log(todoPKG.getTodo(2));
//등록
todoPKG.registTodo({ id: 4, title: 'ts공부중', completed: true });
console.log(todoPKG.getTodos());
//수정
console.log(todoPKG.updateTodo({ id: 4, title: '야식먹기', completed: false }));
//삭제
todoPKG.deleteTodo(4);
console.log(todoPKG.getTodos());
