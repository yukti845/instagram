import React, { useEffect, useState } from 'react';
import { createNewPost } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const initialValue = {
    caption: '',
    postedBy: ''
}

function NewPost(){

    
    const [postInformation, setPostInformation] = useState(initialValue);
    const [localImage, setLocalImage] = useState('');
    const [postImage, setPostImage] = useState('');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');


    useEffect(()=> {
        setPostInformation({
            ...postInformation,
            postedBy: username
        })
    }, [])

    const handleChange = (e) => {
        setPostInformation({
            ...postInformation,
            [e.target.name]: e.target.value
        })
    }

    const savePost = async (e) => {
        e.preventDefault();
        // console.log(postInformation);
        // const data = await 
        // await imageDetails();

        // var bye = ''

        const imageData = new FormData();
        imageData.append('file', localImage);
        imageData.append('upload_preset', 'instagrampost');
        imageData.append('cloud_name', 'rahulmahajan');
        console.log(imageData);
        const keseHo = await fetch('https://api.cloudinary.com/v1_1/rahulmahajan/image/upload', {
            method: 'post',
            body: imageData
        })
        const res = await keseHo.json();
        // console.log(res.url);

        const data = await createNewPost(postInformation, res.url);
        if(data.message){
            toast.success('Post created Successfully')
            navigate(`/profile/${username}`)
        }else{
            toast.error(data.information);
        }
        // console.log(data.message);
    }

    const main__screen = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const addpost__screen = {
        display: 'flex',
        background: 'linear-gradient(to right, #833AB4, #5851DB, #405DE6)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15vh',
        border: '2px solid',
        padding: '10px',
        height: '50vh',
        width: '40vw'
    }

    const form__fields = {
        margin: '10px auto',
        width: '80%',
        height: '7%'
    }

    const form__button = {
        margin: '10px auto',
        width: '80%',
        height: '7%'
    }

    const link__style = {
        color: '#FCAF45',
    }

    // console.log(postInformation);
    // console.log(localImage);

    return(
        <div style = {main__screen}>        
            <div style = {addpost__screen}>
                    <h1>Add Post To Profile</h1>
                    <input style = {form__fields}  name = 'caption' onChange = {(e) => handleChange(e)} placeholder="caption" />
                    <input style = {form__fields} type = 'file' onChange = {(e) => setLocalImage(e.target.files[0])} />
                    <button style = {form__button}type = 'submit' onClick = {(e) => savePost(e)}>Save Post</button>
            </div>
        </div>
    )
}

export default NewPost;