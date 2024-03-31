import axios from 'axios';

const API_URL = '/api/journalentries/';

// Create new journal entry
const setEntry = async (entryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, entryData, config);

  return response.data;
};

// Get user journal entries
const getEntries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user journal entry
const deleteEntry = async (entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + entryId, config);

  return response.data;
};

const journalService = {
  setEntry,
  getEntries,
  deleteEntry,
};

export default journalService;
