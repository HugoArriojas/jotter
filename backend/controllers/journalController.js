const asyncHandler = require('express-async-handler');

const JournalEntry = require('../models/journalModel');

// @desc    Get journal entry
// @route   GET /api/journalentries
// @access  Private
const getEntries = asyncHandler(async (req, res) => {
  const journalEntries = await JournalEntry.find({ user: req.user.id });

  res.status(200).json(journalEntries);
});

// @desc    Set journal entry
// @route   POST /api/journalentries
// @access  Private
const setEntry = asyncHandler(async (req, res) => {
  if (
    !req.body.headline ||
    !req.body.prompt ||
    !req.body.promptResponse ||
    !req.body.text
  ) {
    res.status(400);
    throw new Error('Please add missing fields');
  }

  const journalEntry = await JournalEntry.create({
    headline: req.body.headline,
    prompt: req.body.prompt,
    promptResponse: req.body.promptResponse,
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(journalEntry);
});

// @desc    Update journal entry
// @route   PUT /api/journalentries/:id
// @access  Private
const updateEntry = asyncHandler(async (req, res) => {
  const journalEntry = await JournalEntry.findById(req.params.id);

  if (!journalEntry) {
    res.status(400);
    throw new Error('Journal entry not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the journal user
  if (journalEntry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedEntry = await JournalEntry.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedEntry);
});

// @desc    Delete journal entry
// @route   DELETE /api/journalentries/:id
// @access  Private
const deleteEntry = asyncHandler(async (req, res) => {
  const journalEntry = await JournalEntry.findById(req.params.id);

  if (!journalEntry) {
    res.status(400);
    throw new Error('Journal entry not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the journal user
  if (journalEntry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await journalEntry.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEntries,
  setEntry,
  updateEntry,
  deleteEntry,
};
