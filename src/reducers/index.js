// reducers.js
import { combineReducers } from 'redux';
import userSlice from './userSlice';
import profileSlice from './profileSlice';

const rootReducer = combineReducers({
    user: userSlice,
    profile: profileSlice,
});


export default rootReducer;
