import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
export default function JavascriptSub() {
    const params = useParams();
    const pid = params.pid;
    console.log(pid);
    if(pid==='1'|| pid==='2'){
      return(
        <>
        <div >
          <h3>JavaScript 서브페이지 {pid}</h3>
        </div>

        </>
      );
    } else {
      return(
        <NotFound />
      );
    }
  }
  