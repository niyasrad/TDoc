import axios from "axios";
import React from "react";
import './card.css';


interface CardProps{
    _id: string,
    title: string,
    assignees: Array<string>,
    description: string,
    task: string,
    due: Date,
    priority: "HIGH" | "LOW",
    tags: Array<string>,
    handleDel: any
}
export default function Card( { _id, title, assignees, description, task, due, priority, tags, handleDel }: CardProps) {

    const assigneesString = assignees.map(str => `@${str}`).join(", ");
    const tagsString = tags.map(str => `#${str}`).join(", ");

    const handleDelete = async () => {
        try {
            await axios.post('https://tdoc.onrender.com/tasks/delete', { _id })
        } catch(err) {
            console.log(err)
        }
        handleDel();
    }
    return (
        <div className='card-surface'>
            <div className='card-main'>
                <div className='card-title'>{title}</div>
                <div className='card-assignees'>{assigneesString}</div>
                <div className='card-desc-box'>
                    <span className='desc-box-desc'>{description}</span>
                </div>
                <div className='card-task'>{task}</div>
                <div className='card-due'>Due on {new Date(due).toDateString()}</div>
            </div>
            <div className='card-footer'>
                <div className='footer-tags'>{tagsString}</div>
                <div className={priority === "LOW" ? "footer-mark-done blue" : "footer-mark-done pink"} onClick={handleDelete}>Mark As Done</div>
            </div>
        </div>
    )
}