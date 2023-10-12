// reducers.js
import { combineReducers } from 'redux';
import userSlice from './user/userSlice';
import clientSlice from './client/clientSlice';
import informSlice from './client/informSlice';
import reportSlice from './forms/ReportSlice';

const rootReducer = combineReducers({
    user: userSlice,
    client: clientSlice,
    inform: informSlice,
    report: reportSlice,
});


export default rootReducer;