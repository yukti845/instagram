const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentOn: {
        type: String,
    },
    commentCaption: {
        type: String,
    },
    commentBy: {
        type: String,

    }
})

const comment = mongoose.model('commentTable', commentSchema);

module.exports = comment;