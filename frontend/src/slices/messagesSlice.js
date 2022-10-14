import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async () => {
        const token = localStorage.getItem('auth');
        const response = await axios.get('/api/v1/data', { headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        return response.data;
    },
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
    reducers: {
        addMessage: messagesAdapter.addOne,
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMessages.pending, (state) => {
            state.loadingStatus = 'loading';
            state.error = null;
          })
          .addCase(fetchMessages.fulfilled, (state, { payload }) => {
            console.log(payload)
            messagesAdapter.addMany(state, payload.messages);
            state.loadingStatus = 'idle';
            state.error = null;
          });
      },
})

export const { actions } = messagesSlice;

export default messagesSlice.reducer;