const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        default: 'no image'
    },
    comment: {
        type: ObjectId,
        ref: 'commentTable'
    },
    postedBy: {
        type: ObjectId,
        ref: 'instaUser'
    }
})

const post = mongoose.model('instaPost', postSchema);

module.exports = post;