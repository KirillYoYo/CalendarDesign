
import {
    GET_CALENDAR,
    GET_CALENDAR_SUCCESS,
    ADD_EVENT_SUCCESS,
	DELETE_EVENT
} from '../actions/calendar';

const initialState = {
    events: [],
};

export default function calendar(state = initialState, action = {}) {
	var new_arr = state.events.slice();

    switch (action.type) {
        case GET_CALENDAR_SUCCESS:
            return {
                ...state,
                calendarNumbers: action.payload
            };
        case ADD_EVENT_SUCCESS:
            new_arr.push(action.payload)
            return {
                ...state,
                events: new_arr
            }
	    case DELETE_EVENT:
		    new_arr.forEach(function(item, i, new_arr) {
			    if (item.date === action.data) {
				    new_arr.splice(i, 1)
				    return false
			    } else {
				    return true
			    }
		    });


		    return {
			    ...state,
			    events: new_arr
		    }

        default:
            return state;
    }
}
