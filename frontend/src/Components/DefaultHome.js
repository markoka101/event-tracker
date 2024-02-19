import React, { useEffect } from "react";
import {convertDate,formatDate,dayAndTime}  from '../DateFunctions.js';
import { eventsArr } from "../Order.js";


export default function DefaultHome() {

    //states for event data
    const [data,setData] = React.useState();

    //state for if page is refreshed
    const [refresh,setRefresh] = React.useState(false);

    //state for order to show events
    const [allOrder,setAllOrder] = React.useState(0);

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

    function allOrderSelect(e) {
        e.preventDefault();
        setAllOrder(e.target.value);
        setRefresh(true);
    }

    return (
        <section id='defaultHome'>
            <div className="container w-[95%] h-5/6 mx-auto flex flex-col py-5 px-10 justify-center items-center">
                <h1 className="text-4xl font-bold w-11/12">All Events:</h1>
                
                <div className="flex flex-col bg-stone-500 bg-opacity-30 py-6 w-11/12 px-8 my-2 border-amber-800 border-4 rounded-md h-[82vh] overflow-auto scrollbar">
                <div className="items-end justify-start flex ml-3 mt-1 mb-2">
                            <select
                            className="px-1 ring-1 ring-black"
                            value={allOrder}
                            onChange={e=>allOrderSelect(e)}>
                                <option value={0}>Recent</option>
                                <option value={1}>name</option>
                                <option value={2}>date</option>
                            </select>
                        </div>
                    {eventsArr(data,allOrder,false).map(events => {
                        return(
                            <article key={events.id} className="bg-stone-50 bg-opacity-75 border-black border-2 rounded-md my-2 py-4 px-3 w-full">                                   
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

                            </article>

                        );
                    })}
                </div>
            </div>

        </section>
    );
}