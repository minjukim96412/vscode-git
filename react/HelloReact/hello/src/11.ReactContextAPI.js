//context API
//전역상태관리를 위한 API
//usestate를 통해서 컴포넌트단위의 상태관리를 한다면
//Context API를 통해서는 하위컴포넌트 전체의 상태관리를 하게 됨
//createContext로 컨텍스트를 생성한 후 useContext 훅을 사용

import { createContext, useContext } from "react";

const obj = {
    name: '홍길동',
    age: 20
}

const context = createContext(obj);

export default function ReactContextAPI() {
    // const useCon = useContext(context);
    return (
        <GrandParentComponent />
    );
}

function GrandParentComponent() {
    const useCon = useContext(context);
    return(
        //context제공자 생성
        //context.Provider 내부의 컴포넌트부터
        //컨텍스트가 value의 적용을 받게 됨
        <context.Provider value = {{name: '강감찬', age: 30}}>
            <div id="grandparent">
                <p>GrandParentComponent: {useCon.name}{useCon.age}</p>
                <ParentComponent />
            </div>
        </context.Provider>
    );
}

function ParentComponent() {
    const useCon = useContext(context);
    return(
        <div id="parent">
            <p>ParentComponent : {useCon.name}{useCon.age}</p>
            <ChildComponent />
        </div>
    );
}

function ChildComponent() {
    const useCon = useContext(context);
    return(
        <div id="child">
            <p>ChildComponent : {useCon.name}{useCon.age}</p>
        </div>
    );
}

