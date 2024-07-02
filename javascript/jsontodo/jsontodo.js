$(document).ready(function() {
    updateTodoList();
    $("#registBtn").on("click", () => {
        const newTodo = new Todo(
            getNextTdnoSeq(),
            $("#content").val(),
            new Date(),
            false
        );
        requestTodo("POST", "http://localhost:3000/todos", JSON.stringify(newTodo), updateTodoList);
    });
});

const requestTodo = (method, url, payload, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
            if (callback) callback(xhr.responseText);
        }
    };

    xhr.send(payload);
};

const getNextTdnoSeq = () => {
    const nextTdnoSeq = Number(localStorage.getItem('tdnoSeq')) + 1;
    localStorage.setItem('tdnoSeq', nextTdnoSeq);
    return nextTdnoSeq;
};

const updateTodoList = () => {
    const todoListElement = $("ul"); // 매장 목록을 표시할 HTML 요소 선택
    todoListElement.empty(); // 기존의 매장 목록을 비웁니다.
    requestTodo("GET", "http://localhost:3000/todos", null, (response) => {
        const todos = JSON.parse(response);
        todos.forEach(todo => {
        const todoItem = `<li>
        <p>${todo.id}.${new Date(todo.tdregdate).toLocaleString()}
        &nbsp;&nbsp;&nbsp;<input id="deleteBtn" type="button" value="삭제"/></p>
        <p>${todo.tdcontent}</p>
         </li>`;
        todoListElement.append(todoItem);
        });
    });
};