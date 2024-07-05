// Todo
//Todo타입의 객체 3개를 가진 배열
let todos = [
    { id: 1, title: '아침먹기', completed: true },
    { id: 2, title: 'TS공부', completed: true },
    { id: 3, title: '점심먹기', completed: false }
];
//목록
function getTodos() {
    return todos;
}
//조회
function getTodo(paramId) {
    //id에 해당하는 todo객체를 추출하여 리턴
    return (todos.filter(todo => todo.id === paramId))[0];
}
//배열 요소 추가/삭제
// push()//배열끝에 요소 추가
// apop()//배열끝에서 요소 제거
// aunshift()//배열 처음에 요소 추가
// shift()//배열처음에 요소 제거
//등록
function registTodo(paramTodo) {
    //id가 존재하면 todos배열에 새로운 todo를 삽입
    if (!isExistedTodo(paramTodo.id)) {
        todos.push(paramTodo);
    }
}
//수정
function updateTodo(paramTodo) {
    const id = paramTodo.id;
    //id에 해당하는 todo가 존재하면 
    if (isExistedTodo(id)) {
        //id에 대항하는 todo가 삭제되고 수정할 정보가 담긴 새로운 todo을 추가
        todos = [...deleteTodo(id), paramTodo];
        //todo를 합친 todos배열을 리턴
        return todos;
    }
    else {
        //id가 존재하지 않으면 기존에 todos배열 리턴
        return todos;
    }
}
//삭제
function deleteTodo(paramId) {
    //id에 해당하는 todo가 존재하면
    if (isExistedTodo(paramId)) {
        //id에 해당하지 않는 todo들만 가진 배열을 todos에 저장
        todos = todos.filter(todo => todo.id != paramId);
        //새로 저장한 todos 배열 리턴
        return todos;
    }
    else {
        //id가 존재하지 않으면 기존에 todos배열 리턴
        return todos;
    }
}
//id 존재여부 확인
function isExistedTodo(paramId) {
    //입력받은 number에 해당하는 todo.id가 있으면 true 리턴
    return todos.some(todo => todo.id === paramId);
}
//목록
console.log(getTodos());
//등록
registTodo({ id: 4, title: 'ts공부중', completed: true });
console.log(getTodos());
//수정
console.log(updateTodo({ id: 4, title: '야식먹기', completed: false }));
//한건 조회
console.log(getTodo(4));
//삭제
deleteTodo(4);
console.log(getTodos());
