import React from "react";
import './card.css';


interface CardProps{
    id: number,
    title: string,
    assignees: Array<string>,
    description: string,
    task: string,
    due: string,
    priority: "HIGH" | "LOW",
    tags: Array<string>,
    handleDone: any
}
export default function Card( { id, title, assignees, description, task, due, priority, tags, handleDone }: CardProps) {

    const assigneesString = assignees.map(str => `@${str}`).join(", ");
    const tagsString = tags.map(str => `#${str}`).join(", ");

    return (
        <div className='card-surface'>
            <div className='card-main'>
                <div className='card-title'>{title}</div>
                <div className='card-assignees'>{assigneesString}</div>
                <div className='card-desc-box'>
                    <span className='desc-box-desc'>{description}</span>
                </div>
                <div className='card-task'>{task}</div>
                <div className='card-due'>Due on {due}</div>
            </div>
            <div className='card-footer'>
                <div className='footer-tags'>{tagsString}</div>
                <div className={priority === "LOW" ? "footer-mark-done blue" : "footer-mark-done pink"} onClick={() => handleDone(id)}>Mark As Done</div>
            </div>
        </div>
    )
}