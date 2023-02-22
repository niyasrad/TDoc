import React, { useState } from "react";
import Card from "../../components/card/Card";
import Popup from "../../components/popup/Popup";
import DatePicker from "react-datepicker";
import './cardwrapper.css';
import { myData } from "./data";
import "react-datepicker/dist/react-datepicker.css";

export interface CardItems{
    id: number,
    title: string,
    assignees: Array<string>,
    description: string,
    task: string,
    due: string,
    priority: 'LOW' | 'HIGH',
    tags: Array<string>
}
export default function CardWrapper() {

    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems]= useState<Array<CardItems>>(myData)
    const [nextId, setNextId] = useState<number>(5);
    const [taskSearch, setTaskSearch] = useState<string>('');
    const [assigneeSearch, setAssigneeSearch] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState<string>('');
    const handleAdd = (task: any) => {
        setItems([...items, task]);
        setNextId(nextId + 1)
    }

    const handleClick = () => {
        setOpen(!open);
    }

    const handleDone = (id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }
    return (
        <>
        <div className='card-wrapper-filter'>
                <input className='card-wrapper-search' placeholder='Search Task' onChange={(e) => setTaskSearch(e.target.value)} />
                <input className='card-wrapper-search' placeholder='Filter Assignee' onChange={(e) => setAssigneeSearch(e.target.value)}/>
                <DatePicker className='card-wrapper-search' selected={startDate} onChange={(date: Date) => {
                        setStartDate(date)
                        setDate(date.toISOString().substring(0, 10))
                } }/>
        </div>
        <div className='card-wrapper'>
            {
                items && items
                .filter(item => item.task.toLowerCase().includes(taskSearch.toLowerCase()))
                .filter(item => {
                    if (assigneeSearch.trim() === '') {
                        return true;
                      } else {
                        const assignees = assigneeSearch.split(',');
                        return assignees.some(assignee => item.assignees.includes(assignee.trim().toUpperCase()) || item.assignees.includes(assignee.trim().toLowerCase()));
                      }
                })
                .filter(item => {
                    if (date === '') {
                        return true;
                    } else {
                        return item.due === date;
                    }
                })
                .map((card) => <Card id={card.id} title={card.title} assignees={card.assignees} description={card.description} task={card.task} due={card.due} priority={card.priority} tags={card.tags} handleDone={handleDone}/>)
            }
            <div onClick={handleClick} className='card-wrapper-add'>Add Task</div>
            {open && <Popup handleClick={handleClick} addTask={handleAdd} nextId={nextId}/>}
        </div>
        </>
    )
}