import React, { useState } from "react";
import Card from "../../components/card/Card";
import Popup from "../../components/popup/Popup";
import './cardwrapper.css';
export default function CardWrapper() {

    interface CardItems{
        id: number,
        title: string,
        assignees: Array<string>,
        description: string,
        task: string,
        due: string,
        priority: 'LOW' | 'HIGH',
        tags: Array<string>
    }
    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems]= useState<Array<CardItems>>([
        {id: 1,title:"Investigate response", assignees:["SDE", "SDE-Intern"], description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due:'09-02-2023', priority:'HIGH', tags:["backend", "inspection", "server-side"]},
        {id: 2,title:"Investigate response", assignees:["SDE", "SDE-Intern"], description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due:'09-02-2023', priority:'HIGH', tags:["backend", "inspection", "server-side"]},
        {id: 3,title:"Investigate response", assignees:["SDE", "SDE-Intern"], description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due:'09-02-2023', priority:'HIGH', tags:["backend", "inspection", "server-side"]},
        {id: 4,title:"Investigate response", assignees:["SDE", "SDE-Intern"], description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due:'09-02-2023', priority:'HIGH', tags:["backend", "inspection", "server-side"]}
    ])
    const [nextId, setNextId] = useState<number>(5);
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
        <div className='card-wrapper'>
            {
                items && items.map((card) => <Card id={card.id} title={card.title} assignees={card.assignees} description={card.description} task={card.task} due={card.due} priority={card.priority} tags={card.tags} handleDone={handleDone}/>)
            }
            <div onClick={handleClick} className='card-wrapper-add'>Add Task</div>
            {open && <Popup handleClick={handleClick} addTask={handleAdd} nextId={nextId}/>}
        </div>
    )
}