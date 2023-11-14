const moment = require('moment');

class DateHelper {
    format(date, format) {
        return moment(date).format(format);
    }

    formatExample() {
        return `MMMM Do YYYY, h:mm:ss a // November 14th 2023, 6:08:38 pm\ndddd // Tuesday\nMMM Do YY // Nov 14th 23\nYYYY [escaped] YYYY // 2023 escaped 2023\nempty format // 2023-11-14T18:10:14+03:00`
    }
}

const dateHelper = new DateHelper();

module.exports = {
    dateHelper
}
