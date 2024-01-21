// back end framerwork
const express = require('express');
// Allows us to have .env file with vars in it
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
// specify port where server is running
const port = process.env.PORT || 5000;

const app = express();

// Adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalroutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
