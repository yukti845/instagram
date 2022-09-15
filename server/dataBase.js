const mongoose = require('mongoose');

const URL = 'mongodb+srv://rahulmahajan:mrmr@cluster0.ypjnb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const databaseConnection = async () => {
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('mongo ka connection chla!');
    }catch(err){
        console.log('mongo ka connection error hoga!', err)
    }
}

module.exports = databaseConnection;