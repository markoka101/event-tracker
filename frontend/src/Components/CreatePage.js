import React, {useEffect} from "react";
import moment from "moment";
import  {convertDate, formatDate,dayAndTime} from '../DateFunctions';

export default function CreatePage({user}) {

    /*
    Hooks
    */
    //states for events data
    const [createdEvents,setCreatedEvents] = React.useState();
    const [savedEvents,setSavedEvents] = React.useState();

    //states for the forms to create and edit
    const [createOpen,setCreateOpen] = React.useState(false);
    const [editOpen,setEditOpen] = React.useState(false);

    //states for events property when creating and editing
    const [editNumber,setEditNumber] = React.useState(0);
    const [eventName,setEventName]  = React.useState('');
    const [desc,setDesc] = React.useState('');
    const [date,setDate] = React.useState(moment().format('yyyy-MM-DDTHH:mm').toString());
    const [location,setLocation] = React.useState('');
    const [link,setLink] = React.useState('');
    const [contact,setContact] =  React.useState('');

    //state if page is refreshed
    const [refresh,setRefresh] = React.useState(false);

    //display events on page loading and changes
    useEffect(() =>  {
        //created events
        const createFetch = async() => {
            const createdEvents = await (
                await fetch('http://localhost:8080/user/createdEvents', ({
                    method:'GET',
                    mode:'cors',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }))
            ).json();
            setCreatedEvents(createdEvents);
        };
        //saved events
        const savedFetch = async() => {
            const savedEvents = await (
                await fetch('http://localhost:8080/user/savedEvents',({
                    method:'GET',
                    mode:'cors',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${user.token}`
                    }
                }))
            ).json();
            setSavedEvents(savedEvents);
        }

        setRefresh(false);
        createFetch();
        savedFetch();
        
    },[refresh,user.token]);

    //event object
    const eventObj =  {
        name:eventName,
        description:desc,
        link:link,
        location:location,
        date:date,
        completed:false,
        contact:contact
        

    }

    //handle submit from form to create event
    function createSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8080/user/createEvent', ({
            method:'POST',
            mode:'cors',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify(eventObj)
        }))
        .then(res => {
            if (res.status === 201) {
                setCreateOpen(false);
                setRefresh(true);
            } else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
    }

    //
    const createdArr = (data) => {
        const arr = [];

        if(data) {
            data.forEach(element => {
                arr.push(element);
            })
        }

        return arr;
    }

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

    //delete created event
    function deleteEvent(id) {
        fetch(`http://localhost:8080/user/delete/${id}`, ({
            method:'DELETE',
            mode:'cors',
            headers: {
                'Authorization':`Bearer ${user.token}`
            }
        }))
        .then(res => {
            if(res.status === 200) {
                setRefresh(true);
            } else{
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
    }

    //handle submit for the edit form
    function editSubmit(e) {
        e.preventDefault();
    }

    //form that appears when user wants to edit event
    function editForm() {

    }

    //change createOpen to true when user clicks to create new event
    function clickCreate(e) {
        e.preventDefault();
        setCreateOpen(!createOpen);
    }

    //change editOpen to true when user clicks to edit event
    function clickEdit(editNum) {
        setEditNumber(editNum);
        setEditOpen(!editOpen);
    }
    
    //form that appears when user wants to create an event
    function createForm()  {
        return (
            <div className="flex items-center justify-center px-5">
            <form id='create-form' onSubmit={createSubmit} className="w-full lg:w-5/6 md:w-5/6 sm:w-5/6 h-3/4 flex flex-col text-lg font-bold mt-4">
                <h1>
                    Event Name
                </h1>
                <input type="text" placeholder="name" className="mb-2 pl-1"
                value={eventName}
                onChange={e => setEventName(e.target.value)}/>

                <h1>
                    Description
                </h1>
                <input type="text" placeholder="description" className="mb-2 pl-1"
                value={desc}
                onChange={e=>setDesc(e.target.value)}/>

                <h1>
                    Location
                </h1>
                <input type="text" placeholder="20 W 34th St, New York, NY, 10001" className="mb-2 pl-1"
                value={location}
                onChange={e=>setLocation(e.target.value)}/>

                <h1>
                    Date
                </h1>
                <input type="datetime-local"
                className=""
                value={date}
                onChange={e=>setDate(e.target.value)}/>

                <h1>
                    Contact
                </h1>
                <input type="text" placeholder="Contact"className="mb-2 pl-1"
                value={contact}
                onChange={e=>setContact(e.target.value)}/>

                <h1>
                    Link
                </h1>
                <input type="text" placeholder="link" className="mb-2 pl-1"
                value={link}
                onChange={e=>setLink(e.target.value)}/>

                <button type="submit" value='create'>
                    Submit
                </button>
            </form>
            </div>
        );
    }

    return(
        <section id="createPage">
            <div className="container h-ll/12 flex flex-row w-[95%] h-5/6 mx-auto overflow-auto scrollbar py-5">
                <div className="flex flex-col bg-gray-300 py-6 w-3/5 border-gray-500 border-2 h-full max-h-[75vh] overflow-auto scrollbar">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-bold px-4"> 
                            CREATED EVENTS:
                        </h1>
                        <button 
                        className="p-2 font-bold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2 mr-8"
                        onClick={e=>clickCreate(e)}>
                            Create
                        </button>
                    </div>
                    {createOpen === true ? createForm() : null}
                    <div className="my-2 py-2 px-3 w-full h-[75vh] overflow-auto scrollbar">
                        {createdArr(createdEvents).map(events => {
                            return  (
                                <article key={events.id} className="bg-slate-50 border-black border-2 my-2 py-2  px-3  w-full">
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
                                        onClick={e=>deleteEvent(events.id)}>
                                            DELETE EVENT
                                        </button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
                <div className="bg-slate-300 py-6 ml-10 w-2/5 border-2 border-gray-600">
                    <h1 className="text-4xl font-bold px-4">
                        SAVED EVENTS:
                    </h1>
                    <div className=" my-2 py-2 px-3 w-full max-h-[75vh] overflow-auto scrollbar">
                        {createdArr(savedEvents).map(events => {
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