import React, { useEffect } from "react";
import axios from "axios";
import { getToken, setSession } from "./utils/Common";
import { useNavigate } from "react-router-dom";

function SignIn () {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token)
            navigate('/home');
        document.title = 'Sign In';
    }, []);

    const useValidate = (event) => {
        event.preventDefault();
        const signin = new FormData(event.target);
        const username = signin.get('username');
        const password = signin.get('password');
        
        axios.post('/api/validate', {
            username: username,
            password: password
        }).then(res => {
            console.log(res);
            setSession(res.data.token, res.data.user);
            if (res.data.token) {
                navigate('/home');
            }
            else {
                navigate('/');
            }
        }).catch(error => console.log(error));
    };


    return (
        <div className="">
            <form action='' method='post' onSubmit={useValidate} autoComplete='off'>
                <h1 className="mb-3">Sign In</h1>
                <div className="row mb-1">
                    <div className="col"> <label for="username">Username</label> </div>
                    <div className="col">
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col"> <label for="password">Password</label> </div>
                    <div className="col">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                </div>

                <div className="row mt-3"> <input className="btn" type='submit' value='Sign in'/> </div>
            </form>
        </div>
        
    );
}

export default SignIn;