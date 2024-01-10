import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){

    //setting states for form
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [email,setEmail] = React.useState('');

    const navigate = useNavigate();

    //user object
    const userObj = {
        username : username,
        password : password,
        email : email
    };

    //send user object to backend
    function handleSubmit(e) {
        e.preventDefault();

        
        for(let field in userObj) {
            if(userObj[field] === '')  {
                alert('Please complete all fields');
                return;
            }
        }

        console.log(userObj);

        fetch('http://localhost:8080/user/signup', ({
            method:'POST',
            mode:'cors',
            headers: {
                'Content-Type' : 'application/json' 
            },
            body : JSON.stringify(userObj)
        }))
        .then(res => {
            if (res.status === 201) {
                navigate('/login');
            } else {
                alert('something went wrong');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <section id='register' className="relative items-center flex flex-col justify-center w-screen py-40 h-4/6">
            <div className="container py-14 px-10 flex flex-col w-5/6 sm:w-96 md:w-96 lg:w-1/4 lg:min-w-96 bg-gradient-to-bl from-zinc-400 to-zinc-300 items-center justify-center border-black border-2">
                <h1 className="text-center font-extrabold text-2xl">
                    Welcome
                </h1>
                <form onSubmit={handleSubmit}  className="w-full lg:w-5/6 md:w-5/6 sm:w-5/6 h-4/5 flex flex-col text-lg font-bold mt-4">

                    <label>
                        Email:
                    </label>
                    <input type="email" placeholder="email" className="mb-2 pl-1"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>

                    <label>
                        Username:
                    </label>
                    <input type="text" placeholder="username" className="mb-2 pl-1"
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>

                    <label>
                        Password:
                    </label>
                    <input type="password" placeholder="password" className="mb-2 pl-1"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>

                    <div className="text-lg flex flex-row justify-between w-full pt-8">
                        <button type="submit" value="Register" className="text-center w-1/2 mr-1 sm:mr-2 md:mr-2 lg:mr-4 border-2 border-black bg-gray-200 hover:border-slate-400">
                            Register
                        </button>
                        <button onClick={e => navigate('/')} className="text-center w-1/2 ml-1 sm:ml-2 md:ml-2 lg:ml-4 border-2 border-black bg-gray-200 hover:border-slate-400">
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}