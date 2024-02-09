import moment from "moment";

export function eventsArr (data,order) {
    const arr = [];

    if(data) {
        data.forEach(element => {
            arr.push(element);
        })
    }

    switch(Number(order)) {
        case 1: 
            arr.sort((a,b) => {
                return String(a.name).toLowerCase().localeCompare(String(b.name).toLowerCase());
            })
            console.log(arr);
            break;
        case 2:
            arr.sort((a,b) => moment(a.date,'yyyy-MM-DDTHH:mm').diff(moment(b.date, 'yyyy-MM-DDTHH:mm')));
            console.log(arr);
            break;
        default:
            break;
    }  
    return arr;
}