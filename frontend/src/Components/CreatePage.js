import React, {useEffect} from "react";
import moment from "moment";
import  {convertDate, formatDate,dayAndTime} from '../DateFunctions';
import { eventsArr } from "../Order";
import { environment } from "../MapBoxEnv";
import mapboxgl from "mapbox-gl";
import { AddressAutofill } from "@mapbox/search-js-react";

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

    //states for location form
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [city, setCity] = React.useState('');
    const [addState,setAddState]  = React.useState('');
    const [country,setCountry] = React.useState('');
    const [postal,setPostal] = React.useState('');

    //state if page is refreshed
    const [refresh,setRefresh] = React.useState(false);

    //state for the order to show events
    const [createdOrder,setCreatedOrder] = React.useState(0);
    const  [savedOrder,setSavedOrder] = React.useState(0);

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


    //address object
    const address = {
        addressLine1:address1,
        addressLine2:address2,
        city:city,
        state:addState,
        country:country,
        postalCode:postal
    }

    //event object
    const eventObj =  {
        name:eventName,
        description:desc,
        link:link,
        address:address,
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

                //set hooks to original states
                setEventName('');
                setDesc('');
                setDate(moment().format('yyyy-MM-DDTHH:mm').toString());
                setLocation('');

                //set address hooks back to original state
                setAddress1('');
                setAddress2('');
                setCity('');
                setAddState('');
                setCountry('');
                setPostal('');

            } else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
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
        fetch(`http://localhost:8080/user/edit/${editNumber}`, ({
            method:'PUT',
            mode:'cors',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            },
            body: JSON.stringify(eventObj)
        }))
        .then(res => {
            if (res.status === 200) {
                setEditOpen(false);
                setRefresh(true);

                //set hooks to original states
                setEventName('');
                setDesc('');
                setDate(moment().format('yyyy-MM-DDTHH:mm').toString());
                setLocation('');

                //set address hooks back to original state
                setAddress1('');
                setAddress2('');
                setCity('');
                setAddState('');
                setCountry('');
                setPostal('');
                
            } else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err));
    }

    //form that appears when user wants to edit event
    function editForm() {
        return (
            <div className="flex items-center justify-center px-5 border-2 border-black rounded-md my-4 mx-4 bg-amber-50 bg-opacity-70">
                <form id='edit-form' onSubmit={editSubmit} className="w-full lg:w-5/6 md:w-5/6 sm:w-5/6 h-3/4 flex flex-col text-lg font-bold mt-4 py-2">
                    <h1>
                        Event Name
                    </h1>
                    <input type="text" placeholder="name" className="mb-2 pl-1"
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}/>

                    <h1>
                        Description
                    </h1>
                    <textarea type="text" placeholder="description" className="mb-2 pl-1"
                    value={desc}
                    onChange={e=>setDesc(e.target.value)}/>

                    <h1>
                        Location
                    </h1> 
                    <div className="flex flex-col">
                        <AddressAutofill
                        accessToken={String(environment.mapbox.accessToken)}>
                            <input type='text' placeholder="address line 1" className="mb-2 pl-1 w-full"
                            value={address1}
                            onChange={e=>setAddress1(e.target.value)}/>
                            
                        </AddressAutofill>
                        <input type='text' placeholder="address line 2" className="mb-2 pl-1"
                        value={address2}
                        autoComplete="address-line2"
                        onChange={e=>setAddress2(e.target.value)}/>

                        <input type='text' placeholder="city" className="mb-2 pl-1"
                        value={city}
                        autoComplete="address-level2"
                        onChange={e=>setCity(e.target.value)}/>

                        <input type='text' placeholder="state" className="mb-2 pl-1"
                        value={addState}
                        autoComplete="address-level1"
                        onChange={e=>setAddState(e.target.value)}/>

                        <input type='text' placeholder="country" className="mb-2 pl-1"
                        value={country}
                        autoComplete="country"
                        onChange={e=>setCountry(e.target.value)}/>

                        <input type='text' placeholder="post code" className="mb-2 pl-1"
                        value={postal}
                        autoComplete="postal-code"
                        onChange={e=>setPostal(e.target.value)}/>               
                    </div>
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

                    <div className="flex justify-between w-full my-2">
                        <button 
                        className="py-2 px-4 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2 w-1/4"
                        type="submit" 
                        value='edit'>
                            Submit
                        </button>
                        <button 
                        className="py-2 px-4 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2 w-1/4"
                        onClick={e => setEditOpen(!editOpen)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    //change createOpen to true when user clicks to create new event
    function clickCreate(e) {
        e.preventDefault();
        setCreateOpen(!createOpen);

        //set hooks to events props
        setEventName('');
        setDate(moment().format('yyyy-MM-DDTHH:mm').toString());
        setDesc('');
        setLocation('');
        setContact('');
        setLink('');
    }

    //change editOpen to true when user clicks to edit event
    function clickEdit(events) {
        setEditNumber(events.id);
        setEditOpen(!editOpen);

        //set hooks to events props
        setEventName(events.name);
        setDate(events.date);
        setDesc(events.description);
        setAddress1(events.address.addressLine1);
        setAddress2(events.address.addressLine2);
        setCity(events.address.city);
        setAddState(events.address.state);
        setCountry(events.address.country);
        setPostal(events.address.postalCode);
        setContact(events.contact);
        setLink(events.link);
    }
    
    /*
    Select order to show the events
    */
    function createOrderSelect(e) {
        e.preventDefault();
        setCreatedOrder(e.target.value);
        setRefresh(true);
    }
    function saveOrderSelect(e)  {
        e.preventDefault();
        setSavedOrder(e.target.value);
        setRefresh(true);
    }

    //form that appears when user wants to create an event
    function createForm()  {
        return (
            <div className="flex items-center justify-center px-5 border-2 border-black rounded-md my-2 mx-4 bg-amber-50 bg-opacity-70">
                <form id='create-form' onSubmit={createSubmit} className="w-full lg:w-5/6 md:w-5/6 sm:w-5/6 h-full flex flex-col text-lg font-bold mt-4 py-2">
                    <h1>
                        Event Name
                    </h1>
                    <input type="text" placeholder="name" className="mb-2 pl-1"
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}/>

                    <h1>
                        Description
                    </h1>
                    <textarea type="text" placeholder="description" className="mb-2 pl-1"
                    value={desc}
                    onChange={e=>setDesc(e.target.value)}/>

                    <h1>
                        Location
                    </h1>
                    <div className="flex flex-col">
                        <AddressAutofill
                        accessToken={String(environment.mapbox.accessToken)}>
                            <input type='text' placeholder="address line 1" className="mb-2 pl-1 w-full"
                            value={address1}
                            onChange={e=>setAddress1(e.target.value)}/>
                            
                        </AddressAutofill>
                        <input type='text' placeholder="address line 2" className="mb-2 pl-1"
                        value={address2}
                        autoComplete="address-line2"
                        onChange={e=>setAddress2(e.target.value)}/>

                        <input type='text' placeholder="city" className="mb-2 pl-1"
                        value={city}
                        autoComplete="address-level2"
                        onChange={e=>setCity(e.target.value)}/>

                        <input type='text' placeholder="state" className="mb-2 pl-1"
                        value={addState}
                        autoComplete="address-level1"
                        onChange={e=>setAddState(e.target.value)}/>

                        <input type='text' placeholder="country" className="mb-2 pl-1"
                        value={country}
                        autoComplete="country"
                        onChange={e=>setCountry(e.target.value)}/>

                        <input type='text' placeholder="post code" className="mb-2 pl-1"
                        value={postal}
                        autoComplete="postal-code"
                        onChange={e=>setPostal(e.target.value)}/>               
                    </div>
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

                    <div className="flex justify-between w-full my-2">
                        <button 
                        className="py-2 px-4 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2 w-1/4"
                        type="submit" 
                        value='create'>
                            Submit
                        </button>
                        <button 
                        className="py-2 px-4 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2 w-1/4"
                        onClick={e => setCreateOpen(!createOpen)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return(
        <section id="createPage">
            <div className="container flex flex-row w-[95%] h-5/6 mx-auto overflow-auto scrollbar py-5">
                <div className="flex flex-col bg-stone-500 bg-opacity-30 py-6 w-3/5 border-amber-800 border-4 border-opacity-20 rounded-md h-[87vh] overflow-auto scrollbar">
                    <div className="flex justify-between pr-8">
                        <h1 className="text-4xl font-bold px-4"> 
                            CREATED EVENTS:
                        </h1>
                        <div className="flex justify-between w-1/4 items-end">
                            <div>
                                <div className="items-center justify-start flex ml-3 mt-1 mb-2">
                                    <select
                                    className="px-1 ring-1 ring-black"
                                    value={createdOrder}
                                    onChange={e=>createOrderSelect(e)}>
                                        <option value={0}>Recent</option>
                                        <option value={1}>name</option>
                                        <option value={2}>date</option>
                                    </select>
                                </div>
                            </div>
                            <button 
                            className="py-2 px-4 font-bold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2"
                            onClick={e=>clickCreate(e)}>
                                Create
                            </button>

                            
                        </div>
                        {createOpen === true ? createForm() : null}
                    

                    </div>
                    <div className="px-3 w-full h-full overflow-auto scrollbar">
                        {eventsArr(createdEvents,createdOrder,true).map(events => {
                            return  (
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

                                    <div className="min-w-full flex items-center justify-between my-3">
                                        <button className="p-2 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2" 
                                        onClick={e=>deleteEvent(events.id)}>
                                            DELETE EVENT
                                        </button>
                                        <button className="p-2 font-semibold bg-slate-100 ring-1 ring-gray-500 hover:ring-black hover:ring-2" 
                                        onClick={e=>clickEdit(events)}>
                                            EDIT EVENT
                                        </button>
                                    </div>
                                    {(editOpen === true && editNumber === events.id) ? editForm() : null}
                                </article>
                            )
                        })}
                    </div>
                </div>
                <div className="bg-amber-700 bg-opacity-15 py-6 ml-10 w-2/5 border-4 border-amber-900 border-opacity-15 rounded-md flex flex-col h-[87vh]">
                    <div className="flex justify-between pr-8">
                        <h1 className="text-4xl font-bold px-4">
                            SAVED EVENTS:
                        </h1>
                        <div className="mt-1 mb-2 ml-3 items-end justify-start flex">
                            <select
                            className="px-1 ring-1 ring-black"
                            value={savedOrder}
                            onChange={e=>saveOrderSelect(e)}>
                                <option value={0}>Recent</option>
                                <option value={1}>name</option>
                                <option value={2}>date</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-3 w-full h-full overflow-auto scrollbar">
                        {eventsArr(savedEvents,savedOrder,false).map(events => {
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