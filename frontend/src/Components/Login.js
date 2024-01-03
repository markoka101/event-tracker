import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login({onLogin}){

    //states for form
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');

    //user object
    const userObj = {
        username : username,
        password : password
    };

    //send user credentials to backend
    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8080/user/login', ({
            method: 'POST',
            mode: 'cors',
            headers:  {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(userObj)
        }))
        .then(res => {
            if (res.status === 202) {
                res.json()
                .then(data => {
                    const id = data.id;
                    const username = data.username;
                    const token = data.accessToken;
                    onLogin({id,username,token});
                })
            } else {
                alert('username or password is incorrect');
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <section id='login'>

        </section>
    );
}