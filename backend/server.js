// back end framerwork
const express = require('express');
const colors = require('colors');
// Allows us to have .env file with vars in it
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
// specify port where server is running
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/journalentries', require('./routes/journalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // Setting static build folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
