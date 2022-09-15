import React from 'react';
import Comment from '../social/comment';
import AddComment from '../social/addcomment';

function Post(props) {

    const item = props.data;
    // console.log(item);

    const post__frame = {
        
        margin: '20px auto',
        width: '80%'
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

    const post__username = {
        margin: '15px 0 0 20px',
        padding: 0,
        fontSize: '25px',
        // background: 'linear-gradient(to left, orange, blue,green,pink,yellow)'
        
    }

    const post__segregate = {
        color: 'black'
    }

    const post__caption = {
        margin: '5px 0 0 20px',
        fontSize: '20px',
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

    return(
        <div style = {complete__post}>
            <div style = {post__frame}>
                <h3 style = {post__username}>{item.postedBy.username}</h3>
                <hr style = {post__segregate} />
                <div style = {image__container} ><img style = {post__image} src = {item.postImage} alt  = 'sorry image phuk gayi'/></div>
                <hr style = {post__segregate} />
                <p style = {post__caption}> {item.postedBy.username}: {item.caption}</p>
            </div>

            <Comment commentOf = {item._id} />
            
            <AddComment commentOn = {item._id} />

        </div>
    )
}

export default Post;