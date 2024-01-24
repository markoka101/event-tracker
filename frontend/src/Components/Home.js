import moment from "moment";
import React,{useEffect} from 'react';
import { convertDate, formatDate, dayAndTime } from "../DateFunctions";

export default function Home({user}) {

    //states for event data
    const [data,setData] = React.useState();
    const [saveData,setSaveData] = React.useState();

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

        const saveDateFetch = async() => {
            const saveData = await (
                await fetch('http://localhost:8080/user/savedEvents', ({
                    method:'GET',
                    mode:'cors',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }))
            ).json();
            setSaveData(saveData);
        };

        setRefresh(false);
        saveDateFetch();
        dataFetch();
        
        
    },[refresh,user.token]);

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

    //make sure working with a valid array
    const savedEventsArr = () => {
        const arr = [];

        if(saveData) {
            saveData.forEach(element => {
                arr.push(element);
            })
        }

        return arr;
    }

    //handle user saving event
    function saveEvent(id) {
        fetch(`http://localhost:8080/user/save/${id}`, ({
            method:'POST',
            mode:'cors',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }))
        .then(res=> {
            if(res.status === 200) {
                setRefresh(true);
            } else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
    }

    //handle user removing saved event
    function removeSave(id) {
        fetch(`http://localhost:8080/user/removeSaved/${id}`, ({
            method:'DELETE',
            mode:'cors',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        }))
        .then(res => {
            if(res.status === 200) {
                setRefresh(true);
            } else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <section id='home'>
            <div className="container w-[95%] h-5/6 mx-auto flex flex-row py-5 px-10 items-center justify-center">
                <div className="bg-gray-300 py-6 w-3/5 border-gray-500 border-2 h-full">
                    <h1 className="text-4xl font-bold px-4">
                        ALL EVENTS:
                    </h1>
                    <div className=" my-2 py-2 px-3 w-full max-h-[75vh] overflow-auto scrollbar">
                        {eventsArr().map(events => {
                            return(
                                <article key={events.id} className="bg-slate-50 border-black border-2 my-2 py-2 px-3 w-full">

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

                                    <div className="min-w-full flex items-center justify-center my-3">
                                        <button className="p-2 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2" 
                                        onClick={e=>saveEvent(events.id)}>
                                            SAVE EVENT
                                        </button>
                                    </div>
                                </article>

                            );
                        })}
                    </div>
                </div>

                <div className="bg-slate-300 py-6 ml-10 w-2/5 border-2 border-gray-600">
                    <h1 className="text-4xl font-bold px-4">
                        SAVED EVENTS:
                    </h1>
                    <div className=" my-2 py-2 px-3 w-full max-h-[75vh] overflow-auto scrollbar">
                        {savedEventsArr().map(events => {
                            return(
                                <article key={events.id} className="bg-slate-50 border-black border-2 my-2 py-2 px-3 w-full">

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

                                    <div className="min-w-full flex items-center justify-center my-3">
                                        <button className="p-2 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2" 
                                        onClick={e=>removeSave(events.id)}>
                                            REMOVE EVENT
                                        </button>
                                    </div>
                                </article>

                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}