const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// 
app.get('/', (req, res) => res.send('API Running'));

// Looks for an env variable called PORT. When we deploy to heroku, it will receive a PORT. Otherwise default port is 5000.
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));