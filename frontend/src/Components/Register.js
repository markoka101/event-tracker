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
        <section id='register'>
            
        </section>
    );
}