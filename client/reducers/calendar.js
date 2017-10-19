
import {
    GET_CALENDAR,
    GET_CALENDAR_SUCCESS,
    ADD_EVENT_SUCCESS,
} from '../actions/calendar';

const initialState = {
    events: [],
};

export default function calendar(state = initialState, action = {}) {
    switch (action.type) {
        case GET_CALENDAR_SUCCESS:
            return {
                ...state,
                calendarNumbers: action.payload
            };
        case ADD_EVENT_SUCCESS:
            const new_arr = state.events
            new_arr.push(action.payload)

            return {
                ...state,
                events: new_arr
            }

        default:
            return state;
    }
}
