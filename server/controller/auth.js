const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const JWT = require('jsonwebtoken');

const JWT_SECRET = 'fghjmnvgnv';

const signUp = async (req, res) => {
    const userImage = req.body.imageUrl;
    const username = req.body.userData.username;
    const emailId = req.body.userData.emailId;
    const password = req.body.userData.password;
    const name = req.body.userData.name;
    const phoneNumber = req.body.userData.phoneNumber;

    if(!userImage || !username || !emailId || !password || !name || !phoneNumber){
        return res.json({message: 'please fill all the fields'});
    }

    const isUserName = await User.findOne({
        username: username
    })

    const isEmailId = await User.findOne({
        emailId: emailId
    })

    const isPhoneNumber = await User.findOne({
        phoneNumber: phoneNumber
    })

    // console.log(isUserName, isEmailId, isPhoneNumber);

    if(isUserName || isEmailId || isPhoneNumber){
        console.log('duplicay found');
        return res.json({message: 'duplicay found'})
    }else{

        const encryptedPassword = await bcrypt.hash(password, 15);

        const user = new User({
            username,
            emailId,
            password: encryptedPassword,
            name,
            phoneNumber,
            userImage
        });

        console.log(user);

        user.save().then(() => {
            console.log('ban gya!');
        }).catch(err => {
            console.log('phuka!');
        });
        console.log('signup successfull');
        res.status(200).json({message: 'signup successfull'});
    }
}

const signIn = async (req, res) => {


    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        return res.json({message: 'please fill all the fields'});        
    }

    const isUserName = await User.findOne({
        username: username
    })

    if(isUserName){
        const validPassword = await bcrypt.compare(password, isUserName.password);
        if(validPassword){
            const token = JWT.sign({_id: isUserName._id}, JWT_SECRET);
            return res.json({
                message: 'successfully logged in!',
                token,
                userName: isUserName.username
            })
        }else{
            return res.json({message: 'username or password is not valid'})
        }
    }else{  
        return res.json({message: 'username or password is not valid'})
    }

}

const findUserByUserName = async (req, res) => {
    const username = req.body.username;
    console.log(username);
    if(!username){
        return res.json({message: 'please enter the username for resetting the password'});        
    }

    const isUserName = await User.findOne({
        username: username
    })

    // console.log(isUserName);

    if(isUserName){

        const emailId = isUserName.emailId;

        const digits = '0123456789';

        let OTP = '';

        for(var i = 0; i < 6; i++){
            OTP += digits[Math.floor(Math.random() * 10)]
        }
        
        const encryptedOTP = await bcrypt.hash(OTP, 16);

        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'instagramclone0201@gmail.com',
                pass: 'fjdklahntkkfsdwm'
            }
        })
    
        const mailOptions = {
            from: 'instagramclone0201@gmail.com',
            to: emailId,
            subject: 'One Time Password',
            text: `Your OTP for reseting password on INSTA CLONE is: ${OTP}`
        }
    
        transpoter.sendMail(mailOptions);

        return res.json({
            message: 'user exist',
            userEmail: isUserName.emailId,
            userId: isUserName._id,
            OTP: encryptedOTP
        })
    }else{
        return res.json({message: "this username doesn't exist"})
    }
    
}

const resetPassword = async (req, res) => {
    
    // console.log();

    const id = req.body.userData;
    const password = req.body.password;

    // console.log(req.body);
    // console.log(id, password);

    const newPassword = await bcrypt.hash(password, 15);

    const oldUser = User.find({_id: id})
    // console.log(oldUser);

    const info = await User.findByIdAndUpdate(id, {
        password: newPassword
    })

    console.log(info);
    
    res.json('password changed successfully');

    const newUser = User.find({_id: id})
    // console.log(newUser);

}

const verifyOTP = async (req, res) => {
    const sentOTP = req.body.encryptedOTP;
    const userOTP = req.body.otpValue;

    const validOTP = await bcrypt.compare(userOTP, sentOTP)

    console.log(validOTP);

    return res.json({
        message: validOTP
    })

    // if(validOTP){
        
    // }else{
    //     res
    // }

    // console.log(sentOTP, userOTP);
}

module.exports = { signUp, signIn, findUserByUserName, resetPassword, verifyOTP };