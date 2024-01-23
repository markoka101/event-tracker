import moment from "moment";
import React,{useEffect} from 'react';

export default function Home({user}) {

    //states for event data
    const [data,setData] = React.useState();
    const [saveData,setSaveData] = React.useState();
    const [createdEvents,setCreatedEvents] = React.useState(); 

    //setting states for form to create and edit events
    const [eventForm,setEventForm] = React.useState(false);
    const [editForm,setEditForm] = React.useState(false);

    //states for events property when creating and editing
    const [editNumber,setEditNumber] = React.useState(0);
    const [eventName,setEventName]  = React.useState('');
    const [desc,setDesc] = React.useState('');
    const [date,setDate] = React.useState(moment().format('yyyy-MM-DDTHH:mm').toString());
    const [location,setLocation] = React.useState('');
    const [link,setLink] = React.useState('');
    const [contact,setContact] =  React.useState('');

    //state for if page is refreshed
    const [refresh,setRefresh] = React.useState(false);

    //event object
    const eventObj =  {
        name:eventName,
        desc:desc,
        date:date,
        location:location,
        contact:contact,
        link:link,
        completed:false
    }

    function createEvent(e) {
        e.preventDefault();
    }

    //display events on the page loading
    useEffect(() => {
        const dataFetch = async() =>  {
            const data = await (
                await fetch('http://localhost:8080/events/all', ({
                    method:'GET',
                    mode:'cors',
                    headers: {
                        'Content-Type':'application/json'
                    }
                }))
            ).json();
            setData(data);
        };

        dataFetch();
        setRefresh(false);
    },[refresh]);

    //make sure always working with array that isnt null/undefined
    const eventsArr = ()=> {
        //initialize empty array
        const arr = [];

        if(data) {
            data.forEach(element => {
                arr.push(element);
            });
        }

        return arr;
    }

    //convert date to be more readable
    function convertDate(d) {
        let dArr = d.split('');
        dArr.splice(10,1,' ');
        return dArr.join('');
    }
    const formatDate = fd  => {
        return moment(convertDate(fd),'yyyy-MM-DD HH:mm').format('MM-DD-yyyy h:mm A').toString();
    }
    const dayAndTime = fd => {
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

    //form to create event
    function createEventForm() {
        return(
            <div className="w-full bg-zinc-400 rounded-xl border-2">
                <form id="EventForm" onSubmit={createEvent}  className="flex flex-col">

                </form>
            </div>
        );
    }

    return (
        <section id='home'>
            <div className="container h-11/12 flex flex-row items-center overflow-auto scrollbar">

            </div>
        </section>
    );
}