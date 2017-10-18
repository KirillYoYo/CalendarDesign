
import {
    GET_CALENDAR,
    GET_CALENDAR_SUCCESS,
} from '../actions/calendar';

const initialState = {

};

export default function calendar(state = initialState, action = {}) {
    switch (action.type) {
        case GET_CALENDAR_SUCCESS:
            return {
                ...state,
                calendarNumbers: action.payload
            };

        default:
            return state;
    }
}
