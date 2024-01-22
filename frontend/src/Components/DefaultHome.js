import moment from "moment";
import React, { useEffect } from "react";

export default function DefaultHome() {

    //states for event data
    const [data,setData] = React.useState();

    //state for if page is refreshed
    const [refresh,setRefresh] = React.useState(false);

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


    return (
        <section id='defaultHome' className="relative items-center flex flex-col justify-center w-screen max-h-[90vh] object-scale-down">
            <div className="container w-[95%] h-5/6  mx-auto flex flex-col py-5 px-10 items-center overflow-auto scrollbar">
                <h1 className="text-4xl font-bold w-11/12">All Events:</h1>
                <div className="flex flex-col bg-gray-300 py-6 w-11/12 px-8 my-2 border-gray-500 border-2 rounded">
                    {eventsArr().map(events => {
                        return(
                            <div key={events.id} className="bg-slate-50 border-black border-2 my-2 py-2 px-3 w-full">

                                <h1 className="pb-1 font-bold text-2xl">
                                    {events.name}
                                </h1>
                                <h2 className="font-bold text-xl">
                                    {dayAndTime(events.date)}
                                </h2>

                                <p className="font-semibold text-md">
                                    ({convertDate(formatDate(events.date))})
                                </p>

                                <h2 className="font-bold text-xl">
                                    Description:
                                </h2>
                                <p className="font-semibold text-md">
                                    {events.description}
                                </p>

                                <h2 className="font-bold text-xl">
                                    Location:
                                </h2>
                                <p className="font-semibold text-md">
                                    {events.location}
                                </p>

                                
                                
                                <h2 className="font-bold text-xl">
                                    Contact:
                                </h2>
                                <p className="font-semibold text-md">
                                    {events.contact} <br></br>
                                    {events.link}
                                </p>

                            </div>

                        );
                    })}
                </div>
            </div>

        </section>
    );
}