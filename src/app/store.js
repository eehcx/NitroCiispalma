// store.js
import { configureStore } from '@reduxjs/toolkit'; //getDefaultMiddleware
import rootReducer from '../features/index';

export default store = configureStore({
    reducer: rootReducer,
    //middleware: getDefaultMiddleware(),
});