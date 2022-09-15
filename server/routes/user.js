const express = require('express');

const { getUserDetail, getUserAndPosts } = require('../controller/user');

const router = express.Router();

router.post('/userdata', getUserDetail);
router.post('/searchuserandpost', getUserAndPosts);

module.exports = router;