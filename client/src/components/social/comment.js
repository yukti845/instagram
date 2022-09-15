import React, { useState, useEffect } from 'react';
import { getPostComments } from '../services/api';

function Comment(props) {

    const [buttonClicked, setButtonClicked] = useState(true);
    const [postComments, setPostcomments] = useState([]);

    const commentOf = props.commentOf;

    const handleChange = async (e) => {
        setButtonClicked(false);
        const comments = await getPostComments(commentOf);
        setPostcomments({
            ...comments
        });
    }

    const post__comments = {
        display: 'flex',
    }

    const comment__username = {
        fontWeight: 'bold',
    }

    // console.log(postComments.data);

    const handleOtherChange = (e) => {
        setButtonClicked(true);
    }

    return(

        <>
            {
                buttonClicked 
                    ? 
                <> 
                    <button onClick={handleChange}>show comments</button>
                </>
                     : 
                <>
                    <button onClick={handleOtherChange}>hide comments</button>
                    {/* <h1>this is comment</h1> */}
                    {
                        postComments.data && postComments.data.data.length!==0 
                            ?
                        <>  
                            {
                                postComments.data.data.map((item) => (
                                    <div style = {post__comments}>
                                        <p style = {comment__username} >{item.commentBy}:</p>
                                        <p>{item.commentCaption}</p>
                                    </div>
                                ))
                            }
                        </>
                            :
                        <>
                            <p>No Comments</p>
                        </>
                    }
                </>
            }
        </>


    )
}

export default Comment;