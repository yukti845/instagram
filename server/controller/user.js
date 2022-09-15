const User = require('../model/user');
const Post = require('../model/post');

const getUserDetail = async (req, res) => {
    const username = await req.body.userData;
    // console.log(req.body);
    // console.log(username);

    const userInformation = await User.findOne({username: username});

    // const info = {...userInformation}
    // console.log(userInformation);

    res.json(userInformation);

}

const getUserAndPosts = async (req, res) => {
    const username = req.body.username;
    // console.log(username);

    const isUsername = await User.findOne({username});
    console.log(isUsername);
    if(isUsername){
        // console.log('user mila');
        const userPosts = await Post.find({postedBy: isUsername._id});
        // console.log('userPosts', userPosts);

        return res.json({
            userPosts,
            message: 'user found',
            username: isUsername.username,
            name: isUsername.name,
            userImage: isUsername.userImage,
            testUsername: username
        })

    }else{
        // console.log('user nhi mila!');
        return res.json({
            message: 'username does not exist!',
            username
        })
    }

}

module.exports = {getUserDetail, getUserAndPosts};