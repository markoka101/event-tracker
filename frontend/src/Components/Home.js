import moment from "moment";
import React,{useEffect} from 'react';
import { convertDate, formatDate, dayAndTime } from "../DateFunctions";
import { eventsArr } from "../Order";

export default function Home({user}) {

    //states for event data
    const [data,setData] = React.useState();
    const [saveData,setSaveData] = React.useState();

    //state for if page is refreshed
    const [refresh,setRefresh] = React.useState(false);

    //state for order to show events
    const [allOrder,setAllOrder] = React.useState(0);
    const [savedOrder,setSavedOrder] = React.useState(0);

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

    function allOrderSelect(e) {
        e.preventDefault();
        setAllOrder(e.target.value);
        setRefresh(true);
    }
    function saveOrderSelect(e) {
        e.preventDefault();
        setSavedOrder(e.target.value);
        setRefresh(true);
    }

    return (
        <section id='home'>
            <div className="container w-[95%] h-5/6 mx-auto flex flex-row py-5 px-10 justify-center">
                <div className="bg-stone-500 bg-opacity-30 py-6 w-3/5 border-amber-800 border-opacity-20 rounded-md border-4 h-full">
                    <h1 className="text-4xl font-extrabold px-4">
                        ALL EVENTS:
                    </h1>

                    <div className="items-center justify-start flex ml-3 mt-1 mb-2">
                        <select
                        className="px-1 ring-1 ring-black"
                        value={allOrder}
                        onChange={e=>allOrderSelect(e)}>
                            <option hidden value={0}>Sort By</option>
                            <option value={1}>name</option>
                            <option value={2}>date</option>
                        </select>
                    </div>
                    <div className="px-3 w-full h-[72vh] overflow-auto scrollbar">
                        {eventsArr(data,allOrder,false).map(events => {
                            return(
                                <article key={events.id} className="bg-amber-50 bg-opacity-75 border-black border-2 rounded-md my-2 py-4 px-3 w-full">                                   
                                    <div className="mx-[-12px] border-black border-b-2 pb-3 mb-3">
                                        <h1 className="px-3 font-bold text-2xl">
                                            {events.name}
                                        </h1>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            {dayAndTime(events.date)}
                                        </h2>

                                        <p className="font-semibold text-md">
                                            ({convertDate(formatDate(events.date))})
                                        </p>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            Description:
                                        </h2>
                                        <p className="font-semibold text-md">
                                            {events.description}
                                        </p>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            Location:
                                        </h2>
                                        <p className="font-semibold text-md">
                                            {events.address.addressLine1}, {events.address.addressLine2} <br></br>
                                            {events.address.city}, {events.address.state} <br></br>
                                            {events.address.country} {events.address.postalCode}
                                        </p>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            Contact:
                                        </h2>
                                        <p className="font-semibold text-md">
                                            {events.contact} <br></br>
                                            {events.link}
                                        </p>
                                    </div>

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

                <div className="bg-amber-700 bg-opacity-15  py-6 ml-10 w-2/5 border-4 border-amber-900 border-opacity-15 rounded-md">
                    <h1 className="text-4xl font-bold px-4">
                        SAVED EVENTS:
                    </h1>

                    <div className="items-center justify-start flex ml-3 mt-1 mb-2">
                        <select
                        className="px-1 ring-1 ring-black"
                        value={savedOrder}
                        onChange={e=>saveOrderSelect(e)}>
                            <option hidden value={0}>Sort By</option>
                            <option value={1}>name</option>
                            <option value={2}>date</option>
                        </select>
                    </div>
                    <div className="px-3 w-full h-[72vh] overflow-auto scrollbar">
                        {eventsArr(saveData,savedOrder,false).map(events => {
                            return(
                                <article key={events.id} className="bg-amber-50 bg-opacity-75 border-black border-2 rounded-md my-2 py-4 px-3 w-full">                                   
                                    <div className="mx-[-12px] border-black border-b-2 pb-3 mb-3">
                                        <h1 className="px-3 font-extrabold text-2xl">
                                            {events.name}
                                        </h1>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            {dayAndTime(events.date)}
                                        </h2>

                                        <p className="font-semibold text-md">
                                            ({convertDate(formatDate(events.date))})
                                        </p>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            Description:
                                        </h2>
                                        <p className="font-semibold text-md">
                                            {events.description}
                                        </p>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            Location:
                                        </h2>
                                        <p className="font-semibold text-md">
                                            {events.address.addressLine1}, {events.address.addressLine2} <br></br>
                                            {events.address.city}, {events.address.state} <br></br>
                                            {events.address.country} {events.address.postalCode}
                                        </p>
                                    </div>

                                    <div className="my-3">
                                        <h2 className="font-extrabold text-xl">
                                            Contact:
                                        </h2>
                                        <p className="font-semibold text-md">
                                            {events.contact} <br></br>
                                            {events.link}
                                        </p>
                                    </div>

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