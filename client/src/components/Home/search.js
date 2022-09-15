import React, { useState } from 'react';
import { searchUserAndPosts } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from '../social/comment';
import AddComment from '../social/addcomment';

toast.configure();


function Search() {

    const [searchedUser, setSearchedUser] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [isStarts, setIsStarts] = useState(false);

    const handleChange = (e) => {
        setSearchedUser(e.target.value);
    }

    console.log('searchedUser', searchedUser);

    const searchUser = async(e) => {
        e.preventDefault();

        const userFetchedDetails = await searchUserAndPosts(searchedUser);

        console.log(userFetchedDetails);
        
        // console.log(userDetails);
        
        if(userFetchedDetails.message == 'username does not exist!'){
            toast.error(userDetails.message);
            setShowDetails(false);
            setIsStarts(true);
        }else{
            // console.log(userDetails.message);
            toast.success(userDetails.message);
            setUserDetails({
                ...userFetchedDetails,
            })
            setShowDetails(true)
        }
    }


    const search__header = {
        display: 'flex',
    }

    const userInfo = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const profile__userImage = {
        marginLeft: '45vw',
        marginRight: '45vw',
        // justifyContent: 'center',
        borderRadius: '100%',
        height: '100px',
        width: '100px'
    }

    const windowStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const image__container = {
        alignItems: 'center',
        alignSelf: 'center',
    }

    const post__image = {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
    }

    const post__frame = {
        
        margin: '20px auto',
        width: '80%'
    }

    const complete__post = {
        margin: '18px 13vw',
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px dashed',
        background: 'linear-gradient(to right, #F77737, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #5851DB, #405DE6)'
    }

    const post__caption = {
        margin: '5px 0 0 20px',
        fontSize: '20px',
    }

    const post__segregate = {
        color: 'black'
    }

    const post__username = {
        margin: '15px 0 0 20px',
        padding: 0,
        fontSize: '25px',
        // background: 'linear-gradient(to left, orange, blue,green,pink,yellow)'
        
    }

    // console.log(userDetails);

    return(
        <div style = {windowStyle} >
            <div style = {search__header}>
                <form>
                    <input type = 'text' onChange = { (e) => handleChange(e)} />
                    <button type = 'submit' onClick = { (e) => searchUser(e) } > Search </button>
                </form>

                <Link to = {'/home'} > Home </Link>
            </div>

            { showDetails 
                ? 
              <div style = {userInfo}>
                <img style = {profile__userImage} src = {userDetails.userImage} alt = 'image phuk gayi!' />
                <div>
                    <p> {userDetails.username} </p>
                    <p> {userDetails.name} </p>
                </div>
                {
                    userDetails.userPosts.map((item, ind) => (
                    <div style = {complete__post}>
                        <div style = {post__frame} >
                            <h3 style = {post__username}>{userDetails.username}</h3>
                            <hr style = {post__segregate} />
                            <div style = {image__container} ><img style = {post__image} src = {item.postImage} alt = 'image phuk gayi!' /></div>
                            <hr style = {post__segregate} />
                            <p style = {post__caption} >{item.caption}</p>
                        </div>
                    <Comment commentOf = {item._id} />
        
                    <AddComment commentOn = {item._id} />
                    </div>

                    ))
                }
              </div>
                : 
              isStarts 
                ? 
            <>
                <h1>user not found</h1> 
            </>
                :
            <>
                <h1>search a user</h1>
            </> 
            }
        </div>
    )
}

export default Search;