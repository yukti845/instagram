import React, {useState} from 'react';
import {addComment} from  '../services/api';

function AddComment(props) {
    
    // console.log(props);
    const commentOn = props.commentOn;

    const commentBy = localStorage.getItem('username');

    const [commentCaption, setCommentCaption] = useState('');

    const post__comment = {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const comment__field ={
        width: '80%',
    }

    const comment__button = {
        width: '20%',
        whiteSpace: 'nowrap',
    }

    const handleChange = (e) => {
        setCommentCaption(e.target.value)
    } 

    const saveComment = async (e) => {
        // console.log(commentCaption);
        // console.log(commentOn);
        await addComment(commentOn, commentCaption, commentBy);
        setCommentCaption('');
        // console.log('button click hua!');
    }


    return(
        <>
            <div style = {post__comment}>
                <input style = {comment__field} value = {commentCaption} onChange = { (e) => {handleChange(e)} } type = 'text' />
                <button style = {comment__button} onClick = { saveComment }type = 'submit'> Add </button>
            </div>
        </>
    )
}

export default AddComment; 