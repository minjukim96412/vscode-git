/*
스테이트 (State)
- 컴포넌트 내부의 데이터
- 스테이트의 값(value)과 값변경자(setter)로 구성
- prop은 컴포넌트 내부로 외부컴포넌트의 속성값을 가져오기 위해 사용되고
    스테이트는 컴포넌트 내부의 값을 저장하고 값의 변경에 따라서
    UI가 실시간 자동으로 변경되게 하기 위해 사용됨(*****)
*/

import {useState} from 'react';

export default function ReactUseState() {

//value(=getter)가 count이고 setter가 setCount인 스테이트, 기본값이 0
//count의 값이 setter를 통해 변경되면 UI도 변경됨
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>1. 카운터</h2>
            <p>
                <button onClick={increaseCount}>클릭</button>&nbsp;
                <span id='counter'></span>
            </p>
        </div>
    );

    function increaseCount() {  
        setCount(count+1);//setter
        document.querySelector('#counter').textContent = count;
    }
}