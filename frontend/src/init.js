import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import AuthProvider from './components/providers/AuthProvider';
import ChatApiProvider from './components/providers/ChatApiProvider';
import resources from './locales/index';
import store from './slices/index';
import App from './App';

const init = (socket) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <StoreProvider store={store}>
        <AuthProvider>
          <ChatApiProvider api={socket}>
            <App />
          </ChatApiProvider>
        </AuthProvider>
      </StoreProvider>
    </I18nextProvider>
  );
};

export default init;
