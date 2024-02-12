import moment from "moment";

export function eventsArr (data,order,created) {
    const arr = [];

    if(data) {
        data.forEach(element => {
            //dont push completed events to array unless it is for create page
            if(!element.completed){
                arr.push(element);
            }
            if(element.completed && created)  {
                arr.push(element);
            }
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