import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './Navigation';

// Funcion principal de la aplicación
export default function App() {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};
