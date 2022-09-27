//mongoDB Connection
const mongoose = require('mongoose');
const config = require('config');

//Grabs any values in the config.json file
const db = config.get('mongoURI');

//Called in the server.js
const connectDB = async () => {
    try{ 
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected...');
    }catch(err){
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;