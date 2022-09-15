import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue = {
    username: '',
    password: ''
}

toast.configure();

function Login(){

    const [userData, setUserData] = useState(initialValue);
    const navigate = useNavigate();

    const validateData = async (e) => {
        e.preventDefault();
        // console.log('click hua!');
        // console.log(userData);
        const apiResponse = await signin(userData);
        // console.log(apiResponse);
        // console.log(apiResponse.information.name);
        if (apiResponse.information.message === 'successfully logged in!'){
            localStorage.setItem("token", apiResponse.information.token);
            localStorage.setItem("username", apiResponse.information.userName);
            toast.success('logged in succesful')
            navigate('/home')
        }else{
            toast.error('logged in unsuccessfull')
            // alert(apiResponse.information.message);
        }

    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    // console.log(userData);

    const main__screen = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const login__screen = {
        display: 'flex',
        background: 'linear-gradient(to right, #833AB4, #5851DB, #405DE6)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15vh',
        border: '2px solid',
        padding: '10px',
        width: '75vw'
    }

    const form__fields = {
        margin: '10px auto',
        width: '80%',
        fontSize: '17px',  
        background: '#ADD8E6'
    }

    const form__button = {
        margin: '10px auto',
        width: '80%',
        fontSize: '17px',
        height: '7%'
    }

    const link__style = {
        color: '#FCAF45',
    }
    return(
        <div style = {main__screen} >
            <div style = {login__screen} >
                <h1>Login to Mahajan's</h1>
                <input style = {form__fields}  type="text" name="username" onChange = { (e) => handleChange(e) } placeholder="username" required />
                <input style = {form__fields} type = 'password' name="password" onChange = { (e) => handleChange(e) } placeholder="password" required />
                <button style = {form__button}  type = 'submit' onClick = { (e) => validateData(e) }>Login</button>
                <Link style = {link__style}  to = {'/finduserforreset'}>
                    <p>forgot password? Reset here!</p>
                </Link>
                <Link to = {'/signup'} style = {link__style} >
                    <p>don't have account? SignUp</p>
                </Link>
            </div>
        </div>
    )
}

export default Login;