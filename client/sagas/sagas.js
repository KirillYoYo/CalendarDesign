// noinspection JSAnnotator
import { put, takeEvery , call, take, all, takeLatest} from 'redux-saga/effects'
import getCalendar from './CalendarSaga'

function getTestApi () {
	//return Promise.resolve(	api.get('/some') );
	return Promise.resolve(	() => {'stringTest'});
}

export function* fetchTest() {
	try {
		const test = yield call(getTestApi);
		yield put({type: 'TEST_SUCCESS', payload: test});
	} catch(error) {
		yield put({type: 'TEST_FAILED', error});
	}
}
export function* fetchCalendar(action) {
	console.log('fetchCalendar');
	console.log(action);
	console.log('`');
    try {
        const calendar = yield call(getCalendar, action.data);
        yield put({type: 'GET_CALENDAR_SUCCESS', payload: calendar});
    } catch(error) {
        yield put({type: 'GET_CALENDAR_FAILED', error});
    }
}

function* watchTest() {
	yield takeEvery("TEST", fetchTest);
}
function* watchCalendar() {
    yield takeEvery("GET_CALENDAR", fetchCalendar);
}

export default function* rootSaga() {
	yield all([
		watchTest(),
        watchCalendar(),
	])
}