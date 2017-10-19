
export const GET_CALENDAR = 'GET_CALENDAR';
export const GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';

export const ADD_EVENT = 'ADD_EVENT';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';


export const GET_EVENTS_BY_MONTH = 'GET_EVENTS_BY_MONTH';
export const GET_EVENTS_BY_MONTH_SUCCESS = 'GET_EVENTS_BY_MONTH_SUCCESS';


export function getCalendarNumbers(month) {
    return {
        type: GET_CALENDAR,
        data: month
    }
}

export function addEventAction(data) {
    return {
        type: ADD_EVENT,
        data
    }
}

export function getEventsByMonth(month) {
    return {
        type: GET_EVENTS_BY_MONTH,
        data: month
    }
}
