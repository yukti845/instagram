import React, { useState } from 'react';
import { usrByName } from '../services/api';
// import { useNavigate } from 'react-router-dom';
import ValidateUserByOtp from './ValidateUserByOtp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


const initialValue = {
    username: ''
}

const secondInitialValue = {
    emailId: '',
    userId: '',
    OTP: ''
}

function FindUserForReset(){

    const [userData, setUserData] = useState(initialValue);
    const [isNextComponent, setIsNextComponent] = useState(false);
    const [userDetailForVerification, setUserDetailForVerification] = useState(secondInitialValue); 
    // const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    // console.log(userData);

    const validateUser = async(e) => {
        e.preventDefault();
        // console.log('printhua');    
        const apiResponse = await usrByName(userData);
        // console.log(apiResponse);
        if(apiResponse.message === 'user exist'){
            toast.success('wohoo! user found!');
            setUserDetailForVerification({
                ...userDetailForVerification,
                emailId: apiResponse.userEmail,
                userId: apiResponse.userId,
                OTP: apiResponse.OTP
            });
            setIsNextComponent(true);
        }else{
            // alert(apiResponse.message)
            toast.error(apiResponse.message);
        }
    }
    // console.log(userDetailForVerification);
    // console.log(isNextComponent);

    const main__screen = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const resetpassword__screen = {
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
            <div style = {resetpassword__screen}>
                <h1>Reset Password</h1>
                <input style = {form__fields} type="text" name="username" disabled = {isNextComponent} onChange = { (e) => handleChange(e) } placeholder="username" required />
                    <button stle = {form__button} type = 'submit' onClick = { (e) => validateUser(e)} disabled = {isNextComponent} >Find User</button>
                {
                    isNextComponent ? <ValidateUserByOtp data = {userDetailForVerification} /> : ''
                }
            </div>
        </div>
    )
}

export default FindUserForReset;