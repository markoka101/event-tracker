import React from "react";
import {useNavigate} from 'react-router-dom';

export default function DefaultNav() {

    const navigate = useNavigate();

    return (
        <header className="bg-gray-800 top-0 z-[10vh] flex justify-end">
            <div className="container mx-10 flex flex-row py-3 justify-end">
                <button className="text-zinc-200 hover:text-white font-bold text-xl mr-2"
                onClick={e => navigate('/login')}>
                    Login
                </button>
                <button className="text-zinc-200 hover:text-white font-bold text-xl ml-2"
                onClick={e => navigate('/register')}>
                    Register
                </button>
                
            </div>
        </header>
    );
}