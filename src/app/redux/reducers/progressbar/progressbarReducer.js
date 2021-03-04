import {
    PROGRESSBAR_DATA_FETCHING,
    PROGRESSBAR_DATA_LOADED,
    PROGRESSBAR_ERROR,
    SET_SELECTED_PROGRESSBAR, UPDATE_PROGRESS
} from '../../constants/progressbar/progressbarConstants';

const initialState = {
    data: {
        buttons: [],
        bars: [],
        limit: 0
    },
    loading: false,
    selectedProgressbar: '',
    progressbarFillColours: [],
    errorMessage: ''
};

export const progressbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROGRESSBAR_DATA_FETCHING:
            return {
                ...state,
                loading: true
            }
        case PROGRESSBAR_DATA_LOADED:
            let barColours = [];
            for(let i = 0; i < action.payload.bars.length; i++) {
                barColours.push('#00aec5');
            }
            return {
                ...state,
                loading: false,
                data: action.payload,
                progressbarFillColours: barColours
            }
        case PROGRESSBAR_ERROR:
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage
            }
        case SET_SELECTED_PROGRESSBAR:
            return {
                ...state,
                selectedProgressbar: action.payload
            }
        case UPDATE_PROGRESS:
            const newBars = [...state.data.bars];
            const currentBarColours = [...state.progressbarFillColours];
            let result = 0;
            const calculatedValue = newBars[state.selectedProgressbar] + action.payload;
            result = calculatedValue < 0 ? 0 : calculatedValue;

            newBars[state.selectedProgressbar] = result;
            currentBarColours[state.selectedProgressbar] = calculatedValue >= state.data.limit ? '#dc143c' : '#00aec5';

            return {
                ...state,
                data: {
                    ...state.data,
                    bars: newBars
                },
                progressbarFillColours: currentBarColours
            }
        default:
            return {
                ...state,
                loading: false
            };
    }
}