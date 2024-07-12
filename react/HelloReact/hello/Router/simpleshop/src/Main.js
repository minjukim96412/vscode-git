import './css/Main.css';
import {Routes, Route} from 'react-router-dom';
import Home from './sub/Home'
import Javascript from './sub/Javascript'
import Typescript from './sub/Typescript'
import React from './sub/React'
import NotFound from './sub/NotFound'
import Header from './sub/Header'
import Nav from './sub/Nav'
import Footer from './sub/Footer'
import './css/Footer.css'
import './css/Header.css'
import './css/Nav.css'
export default function Main() {
    return (
        <>
        <div id='wrapper'>
            <Header />
            <Nav />
            <Footer />
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
