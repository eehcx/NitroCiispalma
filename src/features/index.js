// reducers.js
import { combineReducers } from 'redux';
import userSlice from './user/userSlice';
import clientSlice from './client/clientSlice';
import informSlice from './client/informSlice';

const rootReducer = combineReducers({
    user: userSlice,
    client: clientSlice,
    inform: informSlice,
});


export default rootReducer;