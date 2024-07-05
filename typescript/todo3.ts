//todo3.ts
//원격서버의 JSON 사용

interface Todo3 {
    id: number;
    title: string;
    completed: boolean;
}

let todos3: Todo3[] = [];

async function fetchJson(): Promise<Todo3[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if(! response.ok){
        throw new Error('Error : ' + response.statusText);
    }else {
        return await response.json();
    }
}

fetchJson()
.then(async function(response) {
    todos3 = await response;
    todos3 = todos3.map(
        todo3 => todo3 = {id: todo3.id, 
                    title: todo3.title, completed:todo3.completed}).splice(0,5);
})
.then(() => {
    //목록
    console.log(getTodos3());
    //등록
    registTodo3({id:6, title:'ts공부중', completed:true});
    console.log(getTodos3());

    //수정
    updateTodo3({id:6, title:'야식먹기', completed:false});
    console.log(getTodos3());

    //한건 조회
    console.log(getTodo3(4));

    //삭제
    deleteTodo3(4);
    console.log(getTodos3());
});

function getTodos3(): Todo3[] {
    return todos3;
}

function getTodo3(paramId: number): Todo3 {
    return (todos3.filter(todo3 => todo3.id === paramId))[0];
}

function registTodo3(paramTodo: Todo): void {
    if(!isExistedTodo3(paramTodo.id)){
        todos3.push(paramTodo)
    }
}

//수정
function updateTodo3(paramTodo: Todo): Todo[] {
    const id = paramTodo.id;
    //id에 해당하는 todo가 존재하면 
    if(isExistedTodo3(id)){
        todos3=[...deleteTodo3(id), paramTodo];
    }
    return todos3;
}

//삭제
function deleteTodo3(paramId: number): Todo[] {
    if(isExistedTodo3(paramId)){
        todos3= todos3.filter(todo3 => todo3.id!=paramId);
    }
        return todos3;
}

//id 존재여부 확인
function isExistedTodo3(paramId: number): boolean {
    //입력받은 number에 해당하는 todo.id가 있으면 true 리턴
    return todos3.some(todo3 => todo3.id === paramId);
}



