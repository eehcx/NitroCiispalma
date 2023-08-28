// reducers.js
import { combineReducers } from 'redux';
import userSlice from './Reducer/userReducer';
import profileSlice from './Reducer/profileSlice';

const rootReducer = combineReducers({
    user: userSlice,
    profile: profileSlice,
});

export default rootReducer;
