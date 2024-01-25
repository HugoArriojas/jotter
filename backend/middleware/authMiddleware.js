const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    // When token is sent in auth header, it starts with 'Bearer'
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header by splitting into array: [Bearer, token]
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token but don't include password
      req.user = await User.findById(decode.id).select('-password');

      next();
    } catch (error) {
      console.log('Middleware Error:', error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
