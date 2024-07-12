import {NavLink} from 'react-router-dom';
export default function Nav() {
    return(
        <div id='nav'>
            <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/javascript'>Javascript</NavLink></li>
            <li><NavLink to='/typescript'>Typescript</NavLink></li>
            <li><NavLink to='/react'>React</NavLink></li>
            </ul>
        </div>
    );
}