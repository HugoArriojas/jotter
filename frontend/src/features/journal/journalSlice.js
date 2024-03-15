import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import journalService from './journalService';

const initialState = {
  journalEntries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user journal entries
export const getEntries = createAsyncThunk(
  'journals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await journalService.getEntries(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Set user journal entry
export const setEntry = createAsyncThunk(
  'journals/create',
  async (journalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await journalService.setEntry(journalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete journal entry
export const deleteEntry = createAsyncThunk(
  'journals/delete',
  async (journalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await journalService.deleteEntry(journalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const journalSlice = createSlice({
  name: 'journals',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journalEntries.push(action.payload);
      })
      .addCase(setEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journalEntries = action.payload;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journalEntries = state.journalEntries.filter(
          (entry) => entry._id !== action.payload.id
        );
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = journalSlice.actions;
export default journalSlice.reducer;
