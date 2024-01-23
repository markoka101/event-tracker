import React from "react";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";

export default function Navbar({user}) {

    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies();

    return (
        <header className="bg-gray-800 top-0 z-10 flex justify-center w-full">
            <div className="container mx-10 flex flex-row py-3 justify-between min-w-full">
                <div className="flex flex-row px-5">
                    <button className="text-gray-200 hover:text-white font-bold text-xl mr-8"
                    onClick={e => navigate('/')}>
                        Home
                    </button>
                    <button className="text-gray-200 font-bold hover:text-white text-xl"
                    onClick={e => navigate('/my-events')}>
                        Create/Edit
                    </button>
                </div>

                <button className="text-gray-200 hover:text-white font-bold text-xl mr-5"
                onClick={w=> removeCookie('user')}>
                    Sign Out
                </button>
            </div>
        </header>
    );
}