import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    // counter – это свойство будет внутри объекта общего состояния: state.counter
    channels: channelsReducer,
    messages: messagesReducer,
  },
});