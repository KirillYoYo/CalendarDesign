function getCalendar(month, year) {

    var dayes_arr = [];

    const now_date = new Date()
    var now_y =  now_date.getFullYear();
    var now_m =  now_date.getMonth();

    month ?  now_m = month : null;
    year?  now_y = year : null;

    /* 33, а не 32 - для safari*/
    const dayes_in_now_m = 33 - new Date(now_y, now_m, 33).getDate();

    const first_day = new Date(now_y, now_m, 1, 0, 0, 0, 0);

    /*Prev month*/
    if (first_day.getDay() !== 1) {
        var first_day_cnt = first_day.getDay();
        first_day_cnt === 0 ? first_day_cnt = 7 : null;
        for (let i = (first_day_cnt - 2); i >= 0; i-- ) {
            const d = new Date(now_y, now_m, -i);
		        dayes_arr.push({
                date: d, isPrev: true, color: '#0f0'
            })
        }
    }

    /*now month*/
    for (let i = 1; i <= dayes_in_now_m; i++) {
        const d = new Date(now_y, now_m, i, 0 , 0 ,0);
	    const isToday = new Date(now_date.getFullYear(), now_date.getMonth(), now_date.getDate()).getTime()  ===  d.getTime() ;
        dayes_arr.push({date: d,  color: 'none', isToday})
    }
    const last_el_year = dayes_arr[dayes_arr.length -1].date.getFullYear()
    if (last_el_year !== now_y) {
        //this.updateYear(last_el_year)
    }

    const last_day = dayes_arr[dayes_arr.length -1];
    var last_day_cnt = last_day.date.getDay();
    last_day_cnt === 0 ? last_day_cnt = 7 : null;

    /*Next month*/
    for (let i = 1; i < (7 - (last_day_cnt -1)); i++) {
        const d = new Date(now_y, now_m + 1, i);
        dayes_arr.push({date: d, isNext: true,  color: '#00f'})
    }

    /*add days names*/
    const days_names = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье',];
    for (let i = 0; i < 8; i++) {
        dayes_arr[i].dayName = days_names[i]
    }


    return dayes_arr
}
module.exports = getCalendar
