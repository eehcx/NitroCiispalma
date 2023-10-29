import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import Navigation from './Navigation';

// Funcion principal de la aplicación
export default function App() {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
