import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../Posts/post';

import { getAllPosts } from '../services/api';

function Home(){

    const home__component = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '80%'
    }

    const home__navbar = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'cyan',
    }

    const home__navbarItems = {
        margin: '10px'
    }

    const main__component = {
        display: 'flex',
        flexDirection: 'column',
    }

    const data = localStorage.getItem('username');
    // console.log(data);

    const [allPosts, setAllPosts] = useState('');

    const navigate = useNavigate();

    const clickEvent = (e) => {
        localStorage.clear();
        navigate('/')
    }

    useEffect(() => {
        const fetchAllPosts  = async () => {
            const allPostsData = await getAllPosts();
            setAllPosts(allPostsData.posts);
        }
        fetchAllPosts();
    }, [])

    
    // console.log(allPosts);

    return(
        <div style = {main__component}>
            <div style = {home__navbar}>
                <Link style = {home__navbarItems} to = {`/profile/${data}`}>Profile</Link>
                <Link style = {home__navbarItems} to = {`/search`}>Search User</Link>
                
                <button style = {home__navbarItems} onClick = {() => clickEvent()}>LogOut</button>
            </div>

            <div style = {home__component} >
                {
                    allPosts && allPosts.map((item, ind) => (
                        <Post data = {item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home;