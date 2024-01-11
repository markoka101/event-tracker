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

    return (
        <section id='defaultHome' className="relative bg-gray-50 items-center flex flex-col justify-center w-screen h-[94vh] min-h-0 object-scale-down">
            <div className="container w-[95%] h-5/6 bg-gray-300 mx-auto flex flex-col py-5 px-10 items-center resi">
                <div className="flex flex-col bg-gray-400 py-2 w-11/12 px-1 my-2 overflow-auto scrollbar">
                    {eventsArr().map(events => {
                        return(
                            <div key={events.id} className="bg-white border-black border-2 my-2 py-2 px-3 w-full">

                                <h1 className="pb-1 font-bold text-xl">
                                    {events.name}
                                </h1>
                            </div>

                        );
                    })}
                </div>
            </div>

        </section>
    );
}