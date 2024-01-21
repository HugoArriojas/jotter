// Defining the schema (fields for this resource)
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      unique: false,
      required: [true, 'Please add a text value'],
    },
  },
  {
    // Will create 'updatedAt'/'createdAt' fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
