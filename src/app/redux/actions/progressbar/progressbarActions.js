import axios from 'axios';
import {
    PROGRESSBAR_DATA_LOADED,
    PROGRESSBAR_ERROR, SET_SELECTED_PROGRESSBAR, UPDATE_PROGRESS
} from "../../constants/progressbar/progressbarConstants";

const apiUrl = 'http://pb-api.herokuapp.com/bars';

export const fetchData = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: PROGRESSBAR_DATA_LOADED,
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: PROGRESSBAR_ERROR,
                    errorMessage: error
                })
            })
    }
}

export const setSelectedProgressbar = (progressbar) => {
   return {
            type: SET_SELECTED_PROGRESSBAR,
            payload: progressbar
    };
}

export const updateProgress = (completed) => {
    return {
        type: UPDATE_PROGRESS,
        payload: completed
    }
}