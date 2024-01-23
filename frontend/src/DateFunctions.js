import moment from "moment";
/*
Functions to handle date formats
*/

//convert date
export function convertDate(d) {
    let dArr = d.split('');
    dArr.splice(10,1,' ');
    return dArr.join('');
}

//format date to use 12hr clock
export function formatDate(fd) {
    return moment(convertDate(fd), 'yyyy-MM-DD HH:mm').format('MM-DD-yyyy h:mm A').toString();
}

//returns the date in sentence form
export function dayAndTime(fd) {
    const d = moment(convertDate(fd));
    const day = d.isoWeekday();
    const month = d.format('MMMM');
    const time = d.format('h:mm A');
    const year  = d.format('yyyy');
    const dNum = d.format('DD');

    //switch statement to create sentence for date   
    switch(day) {
        case 1:
            return `Monday, ${month} ${dNum}, ${year} at ${time}`;
        case 2:
            return `Tuesday, ${month} ${dNum}, ${year} at ${time}`;
        case 3:
            return `Wednesday, ${month} ${dNum}, ${year} at ${time}`;
        case 4:
            return `Thursday, ${month} ${dNum}, ${year} at ${time}`;
        case 5:
            return `Friday, ${month} ${dNum}, ${year} at ${time}`;
        case 6:
            return `Saturday, ${month} ${dNum}, ${year} at ${time}`;
        default:
            return `Sunday, ${month} ${dNum}, ${year} at ${time}`;
    }
}

