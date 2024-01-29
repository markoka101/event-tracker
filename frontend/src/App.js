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
import CreatePage from './Components/CreatePage';

export default function App() {

    const[cookies,setCookie] = useCookies(['user']);

    function handleLogin(user) {
        setCookie('user',user,{path:'/'},{expires:3600})
    }

    return (
        <main className='bg-gradient-to-tr from-slate-300 to-slate-200 w-screen h-screen'>
            <CookiesProvider>
                {cookies.user ? (
                    <BrowserRouter>
                        <Navbar user = {cookies.user}/>
                        <Routes>
                            <Route path='*' element={<Home user = {cookies.user} />} />
                            <Route path='/my-events' element={<CreatePage user = {cookies.user} />} />
                        </Routes>
                    </BrowserRouter>
                ) : (
                    <BrowserRouter>
                        <DefaultNav />
                        <Routes>
                            <Route path='*' element={<DefaultHome />} />
                            <Route path='/login' element={<Login onLogin={handleLogin}/>} />
                            <Route path='/register' element={<Register />} />
                        </Routes>
                    </BrowserRouter>
                )}
            </CookiesProvider>
        </main>
    );
}
