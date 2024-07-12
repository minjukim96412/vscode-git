//React Router Dom
// - 경로별 컨텐츠 또는 페이지를 설정할때 사용
// - browoserRouter 컴포너트 또는  hashRouter 컴포넌트로 app 컴포넌트를 감싸줌
// - browserRouter : 웹브라우져 기반의 라우터
// - hashRouter : 웹서버가 다른  URl호출시 동일한 페이지를 보여 줄 수 없는
//                경우에만 사용(주소 앞에 /#/이 붙음)
// - Routes컴포넌트 : route들의 모임
// - Route컴포넌트 : path(경로)와 element(컴포넌트)
// - Link컴포넌트 : to(경로), a엘리먼트는 페이지가 리로딩 되므로 
//                  Link컴포넌트를 사용해서 리로딩 방지
// - navLink컴포넌트 : Link의 업그레이드 버젼, 만들어질떄 현재 경로에
//                    해당하는 navLink의 class속성이 active로 설정됨
// - useParams훅 : 라우팅시 파라미터들의 정보를 가진 훅

import {Routes, Route, Link, NavLink, useParams} from 'react-router-dom';

import './App.css';

function App() {
  return (
   <>
    <div>
      <p>
        <a href='/'>Home</a>
        <a href='/javascript'>Javascript</a>
        <a href='/typescript'>Typescipt</a>
        <a href='/react'>React</a><br />
        
        <Link to='/'>Home</Link>
        <Link to='/javascript'>Javascript</Link>
        <Link to='/typescript'>Typescript</Link>
        <Link to='/react'>React</Link><br />

        <NavLink to='/'>Home</NavLink>
        <NavLink to='/javascript'>Javascript</NavLink>
        <NavLink to='/typescript'>Typescript</NavLink>
        <NavLink to='/react'>React</NavLink> <br />
        
      </p>
    </div>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/javascript' element={<Javascript />} />
      <Route path='/javascript/*' element={<Javascript />} /> {/* nested router */}
      <Route path='/typescript' element={<Typescript />} />
      <Route path='/react' element={<React />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>

   </>
  );
}

function Home() {
  return (
    <div>
      <h2>Home 페이지</h2>
    </div>
  );
}

function Javascript() {
  return(
    <>
      <div>
        <h2>Javascript 페이지</h2>
        <p>
          <NavLink to='/javascript/1'>sub1</NavLink>
          <NavLink to='/javascript/2'>sub2</NavLink>
        </p>
      </div>
      <Routes>
        <Route path='/:pid' element={<JavascriptSub />} />
      </Routes>
    </>
  );
}

function JavascriptSub() {
  const params = useParams();
  const pid = params.pid;
  if(pid==='1'|| pid==='2'){
    return(
      <div>
        <h3>JavaScript 서브페이지 {pid}</h3>
      </div>
    );
  } else {
    return(
      <NotFound />
    );
  }
}

function Typescript() {  
  return(
    <div>
      <h3>TypeScript 페이지 </h3>
    </div>
  );
}

function React() {  

  return(
    <div>
      <h3>React 페이지 </h3>
    </div>
  );
}

function NotFound() {  
  return (
    <div>
      <h2>404 NotFound! 페이지를 찾을 수 없습니다.</h2>
    </div>
  );
}

export default App;
