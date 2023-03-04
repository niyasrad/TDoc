import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Popup from "../../components/popup/Popup";
import DatePicker from "react-datepicker";
import './cardwrapper.css';
import { myData } from "./data";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export interface CardItems{
    _id: string
    title: string,
    assignees: Array<string>,
    description: string,
    task: string,
    due: Date,
    priority: 'LOW' | 'HIGH',
    tags: Array<string>,
    handleDel: any
}

interface Props {
    token: string,
    handleSignOut: any
}

export default function CardWrapper({ token, handleSignOut }: Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems]= useState<Array<CardItems>>([])
    const [startDate, setStartDate] = useState(new Date());
    const [query, setQuery] = useState<any>({});
    const [forcedUpdate, setForced] = useState<boolean>(false);

    const handleAdd = () => {
        setForced(!forcedUpdate);
    }
    const handleClick = () => {
        setOpen(!open);
    }
    const handleDel = () => {
        setForced(!forcedUpdate)
    }

    useEffect( () => {
        axios.post('https://tdoc.onrender.com/tasks/list', { ...query, token})
        .then ((res) => res.data)
        .then ((data) => {
            setItems(data.tasks)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [query, forcedUpdate])
    return (
        <>
        {/* <div onClick={handleSignOut} className='card-wrapper-signout'>Sign Out</div> */}
        {/* <div className='card-wrapper-filter'>
                <input className='card-wrapper-search' placeholder='Search Task' onChange={(e) => {
                    setQuery({...query, task: e.target.value})
                }} />
                <input className='card-wrapper-search' placeholder='Filter Assignee' onChange={(e) => {
                    setQuery({...query, assignees: e.target.value.split(',').map((assignee) => assignee.trim())})
                }}/>
                <DatePicker className='card-wrapper-search' selected={startDate} onChange={(date: Date) => {
                    setStartDate(date);
                    setQuery({...query, due: date})
                } }/>
        </div> */}
        <div className='card-wrapper'>
            {
                items && 
                items.map((card) => <Card _id={card._id} title={card.title} assignees={card.assignees} description={card.description} task={card.task} due={card.due} priority={card.priority} tags={card.tags} handleDel={handleDel} token={token}/>)
            }
            <div onClick={handleClick} className='card-wrapper-add'>Add Task</div>
            {open && <Popup handleClick={handleClick} addTask={handleAdd} token={token}/>}
        </div>
        </>
    )
}