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
        desc:desc,
        date:date,
        location:location,
        contact:contact,
        link:link,
        completed:false
    }

    //handle submit from form to create event
    function createSubmit(e) {
        e.preventDefault();
    }

    //handle submit for the edit form
    function editSubmit(e) {
        e.preventDefault();
    }

    //form that appears when user wants to edit event
    function editForm() {

    }
    
    //form that appears when user wants to create an event
    function createForm()  {

    }
    return(
        <section id="createPage">
            <div className="container h-ll/12 flex flex-row items-center overflow-auto scrollbar">
                
            </div>
        </section>
    );
}