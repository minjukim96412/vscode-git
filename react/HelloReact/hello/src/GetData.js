import { useEffect, useState } from 'react';

export default function GetData() {
     // 선택된 todo 항목 또는 전체 데이터를 저장하는 상태
    const [data, setData] = useState('');
     // API에서 가져온 todos 배열을 저장하는 상태
    const [todos, setTodos] = useState([]);
    const url = 'https://jsonplaceholder.typicode.com/todos';

    useEffect(() => {
        // 페이지가 로딩될 때 데이터를 가져옴
        fetch(url)
            .then(response => response.json())
            .then(result => {
                setTodos(result);//todos 배열 생성
                setData(JSON.stringify(result));//전체데이터 출력
            })
    },[]);
    
    const select = (event) => {
        const selectedId = event.target.value;// 선택된 옵션의 값을 가져옴
        if (selectedId) {
            fetch(`${url}/${selectedId}`)// 선택된 id에 해당하는 todo 항목을 가져옴
                .then(response => response.json())
                .then(result => setData(JSON.stringify(result)))
        }else {
            setData(JSON.stringify(todos)); // 선택된 id가 없으면 전체 데이터를 저장
        }
    };
    return (
        <div>
            {/* select 사용시에는 일반적으로 onclick보다 change를 사용하여 값 변경 */}
            <select onChange={select} style={{ fontSize: '20px'}}>
                <option value="" >--전체--</option>
                {/* map()이용해서 todo.id 개수만큼 반복시켜 id옵션창 만들기 */}
                {todos.map(todo => (
                    <option key={todo.id} value={todo.id}>
                        {todo.id}
                    </option>
                ))}
            </select>
            <p>
                <span id='result'>{data}</span>
            </p>
        </div>
    );
}
