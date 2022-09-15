import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserPosts } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import ProfilePost from '../Posts/profilePost';

function Profile(){


    const profile__navbar = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'cyan',
    }

    const profile__navbarItems = {
        margin: '10px'
    }

    const profile__user = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        flexDirection: 'column',
        
    }

    const profile__userInformation = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexBasis: '50px',
        widht: 'inherit',
        background: 'linear-gradient(to right, #F77737, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #5851DB, #405DE6)',
    }

    const profile__userInformationEach = {
        // marginLeft: '80px',
        // marginRight: '80px'
    }

    const profile__userImage = {
        marginLeft: '45vw',
        marginRight: '45vw',
        // justifyContent: 'center',
        borderRadius: '100%',
        height: '100px',
        width: '100px'
    }

    const [data, setData] = useState('')
    const [postData, setPostData] = useState('');
    const username = localStorage.getItem('username');

    // console.log(username);

    const navigate = useNavigate()

    const handleChange = (e) => {
        navigate('/createnewpost')
    }

    useEffect(() => {
        const fetchData = async() => {
            // console.log(username);
            const data = await getUserDetails(username);
            // console.log(data);
            // const postData = await getUserPosts(username);
            setData(data)
        }
        const fetchPost = async () => {
            // console.log(username);
            const postData = await getUserPosts(username);
            // console.log(postData);
            setPostData(postData);
        }
        fetchData();
        fetchPost();
    }, [])

    // console.log(postData);
    // console.log(data);
    const newData = [];
    newData.push(data)
    // console.log(newData);
    
    const mainScreen = {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    }

    return(

        <>

            <div style = {profile__navbar} >
                <button style = {profile__navbarItems} onClick={(e) => handleChange(e)}>
                    Create New Post
                </button>
                <Link to = {'/home'} style = {profile__navbarItems} >Home</Link>
            </div>

            <div style = {mainScreen}>
                {
                    newData && newData.map((item, ind) => (
                        <div style = {profile__user}>
                            <img style = {profile__userImage} src = {item.userImage} alt = 'user image phuki'  />
                            <div style = {profile__userInformation} >
                                <p style = {profile__userInformationEach}>{item.username}</p>
                                <p style = {profile__userInformationEach}>{item.name}</p>
                                <p style = {profile__userInformationEach}>{item.emailId}</p>
                            </div>
                        </div>
                    ))
                }

                {
                    postData && postData.map((item, ind) => (
                        <ProfilePost data = {item} />
                    ))
                }
            </div>
            
            
        </>
    )
}

export default Profile;