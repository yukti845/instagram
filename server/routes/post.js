const express = require('express');

const { createPost, getAllPost, getUserPost, addComment, getPostComments } = require('../controller/post');

const router = express.Router();

router.post('/createpost', createPost);
router.get('/getallpost', getAllPost);
router.post('/userpost', getUserPost);
router.put('/addcomment', addComment);
router.post('/postcomment', getPostComments)

module.exports = router;