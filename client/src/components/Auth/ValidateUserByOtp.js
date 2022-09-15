import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../services/api';
import ResetPassword from './ResetPassword';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function ValidateUserByOtp(props){
    // console.log(props);
    const userId = props.data.userId;
    const userDetail = props.data.emailId;
    const encryptedOTP = props.data.OTP;
    // console.log(userDetail);
    let userEmailId = userDetail;
    const indexOfAt = userEmailId.indexOf('@');
    userEmailId = userEmailId.split('');
    for(var i = 1; i < indexOfAt-1; i++){
        userEmailId[i] = '*'
    }
    userEmailId = userEmailId.join('');

    const navigate = useNavigate();
    const [otpValue, setOtpValue] = useState('');
    const [isResetScreen, setIsResetScreen] = useState(false);

    const handleChange = (e) => {
        setOtpValue(e.target.value)
    }
    // console.log(otpValue);


    const cancelButton = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const apiResponse = await verifyOTP(otpValue, encryptedOTP);
        // console.log(apiResponse);
        // console.log('click hua!');
        if(apiResponse.message){
            setIsResetScreen(true);
        }else{
            toast.error('entered otp is incorrect');
        }
    }

    return(
        <>
            <h3>Otp Shared on {userEmailId}</h3>
            <form>
                <input type = 'text' disabled = {isResetScreen} name="Otp" placeholder="Enter Otp" onChange={ (e) => handleChange(e) } required />
                <button type = 'submit' disabled = {isResetScreen} onClick={ (e) => submitHandler(e) }>Validate Otp</button>
                <button type = 'submit' disabled = {isResetScreen} onClick={(e) => cancelButton(e)} >Cancel</button>
            </form>

            {isResetScreen ? <ResetPassword data = {userId} /> : ''}
        </>
    )
}

export default ValidateUserByOtp;