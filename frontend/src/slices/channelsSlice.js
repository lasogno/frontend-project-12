import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async () => {
        const token = localStorage.getItem('auth');
        const response = await axios.get('/api/v1/data', { headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        return response.data;
    },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null, currentChannelId: 1 }),
    reducers: {
      setCurrentChannel(state, { payload }) {
        state.currentChannelId = payload.channelId;
      },
      addNewChannel(state, { payload }){
        channelsAdapter.addOne(state, payload);
        state.currentChannelId = payload.id;
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchChannels.pending, (state) => {
            state.loadingStatus = 'loading';
            state.error = null;
          })
          .addCase(fetchChannels.fulfilled, (state, { payload }) => {
            channelsAdapter.addMany(state, payload.channels);
            state.loadingStatus = 'idle';
            state.error = null;
          });
      },
})

export const { actions } = channelsSlice;

export default channelsSlice.reducer;