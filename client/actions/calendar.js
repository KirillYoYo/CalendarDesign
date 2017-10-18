
export const GET_CALENDAR = 'GET_CALENDAR';
export const GET_CALENDAR_SUCCESS = 'GET_CALENDAR_SUCCESS';


export function getCalendarNumbers(month) {
    return {
        type: GET_CALENDAR,
        data: month
    }
}
