import { combineReducers } from "redux";
import { progressbarReducer } from './progressbar/progressbarReducer';

export default combineReducers({
    progressbar: progressbarReducer
});