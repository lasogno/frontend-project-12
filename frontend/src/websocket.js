import { io } from 'socket.io-client';
import store from './slices/index';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';

const initSocket = () => {
  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  const sendMessage = (data, callback) => {
    socket.emit('newMessage', data, callback);
  };

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
    store.dispatch(channelsActions.setCurrentChannelId(payload.id));
  });
  const createNewChannel = (name, callback) => {
    socket.emit('newChannel', { name }, callback);
  };

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
  });
  const updateChannelName = ({ id, name }, callback) => {
    socket.emit('renameChannel', { id, name }, callback);
  };

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.setDefaultChannelId(id));
    store.dispatch(channelsActions.removeChannel(id));
  });
  const deleteChannel = (id, callback) => {
    socket.emit('removeChannel', { id }, callback);
  };
  return {
    sendMessage,
    createNewChannel,
    updateChannelName,
    deleteChannel,
  };
};

export default initSocket;
