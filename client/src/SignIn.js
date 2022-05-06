import React, { Component, useEffect } from "react";
import axios from "axios";
import { getToken, getUser, setSession } from "./utils/Common";
import Home from './Home';
import { useNavigate } from "react-router-dom";


function SignIn () {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token)
            navigate('/home');
    });

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
        <form action='' method='post' onSubmit={useValidate} autoComplete='off'>
            <table>
                <tr>
                    <td> <label for="username">Username</label> </td>
                    <td> <input 
                            type="text"
                            id="username"
                            name="username"
                            // onChange={e => {this.setState( {username: e.target.value} )}}
                            required
                        /> </td>
                </tr>

                <tr>
                    <td> <label for="password">Password</label> </td>
                    <td> <input
                            type="password"
                            id="password"
                            name="password" 
                            // onChange={e => {this.setState( {password: e.target.value} )}}
                            required/> </td>
                </tr>

                <tr> <td> <input type='submit' value='Sign in'/> </td> </tr>
            </table>
        </form>
    );
}




export default SignIn;


// const useInput = initialValue => {
//     const [value, setValue] = useState(initialValue);

//     const handleChange = e => {
//         setValue(e.target.value);
//     }
//     return {
//         value,
//         onChange: handleChange
//     }
// }