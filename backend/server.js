// back end framerwork
const express = require('express');
// Allows us to have .env file with vars in it
const dotenv = require('dotenv').config();
// specify port where server is running
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/goals', require('./routes/goalroutes'));

app.listen(port, () => console.log(`Server started on port: ${port}`));
