// Defining the schema (fields for this resource)
const mongoose = require('mongoose');

const journalEntrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    headline: {
      type: String,
      required: [true, 'Please add a headline'],
    },
    prompt: {
      type: String,
      required: [true, 'Please select a prompt'],
    },
    promptResponse: {
      type: String,
      required: [true, 'Please add a prompt response'],
    },
    text: {
      type: String,
      required: [true, 'Please add some body text'],
    },
  },
  {
    // Will create 'updatedAt'/'createdAt' fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Journal Entry', journalEntrySchema);
