import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {Cookies, CookiesProvider,useCookies} from 'react-cookie'

//importing pages and components
import Home from "./Components/Home";
import Login from "./Components/Login";
import DefaultHome from './Components/DefaultHome';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import DefaultNav from './Components/DefaultNav';

export default function App() {

    const[cookies,setCookie] = useCookies(['user']);

    return (
        <main className='bg-slate-400 h-90 w-screen h-screen'>
            <CookiesProvider>
                {cookies.user ? (
                    <>
                    <Navbar user = {cookies.user}/>
                    <Home user  = {cookies.user}/>
                    </>
                ) : (
                    <BrowserRouter>
                        <DefaultNav />
                        <Routes>
                            <Route path='/' element={<DefaultHome />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                        </Routes>
                    </BrowserRouter>
                )}
            </CookiesProvider>
        </main>
    );
}
