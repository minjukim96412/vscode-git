import {Link} from 'react-router-dom';
export default function Footer() {
    return(
        <div id='footer'>
            <p><Link to='/'> Home </Link></p>
            <p><Link to='/javascript'> Javascript </Link></p>
            <p><Link to='/typescript'> Typescript </Link></p>
            <p><Link to='/react'> React </Link></p>
        </div>
    );
}