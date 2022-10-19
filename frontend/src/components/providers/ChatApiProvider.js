import React, { useContext, createContext } from 'react';

const ChatApiContext = createContext();
export const useChatApi = () => useContext(ChatApiContext);

const ChatApiProvider = ({ api, children }) => (
  <ChatApiContext.Provider
    value={api}
  >
    { children }
  </ChatApiContext.Provider>
);

export default ChatApiProvider;
