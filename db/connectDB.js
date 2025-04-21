const mongoose = require('mongoose')


let isConnected;

const connectDB = async (url) => {

    if(isConnected) return;

    try{
        console.log('Database Connnected Successfully');
        await mongoose.connect(url)
        isConnected = true;
        console.log('MongoDB connected');
    }
    catch(err){
        isConnected = false;
        console.log(err)
        console.log('Not connected');
    }
}

module.exports = connectDB