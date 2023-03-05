import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import './card.css';

interface CardProps{
    _id: string,
    title: string,
    description: string,
    task: string,
    due: Date,
    priority: "HIGH" | "LOW",
    handleDel: any,
    token: string
}
export default function Card( { _id, title, description, task, due, priority, handleDel, token }: CardProps) {

    const variants = {
        open: {
            height: "auto",
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 200, damping: 14 }
        },
        closed: { opacity: 0, height: "0", y: -20, transition: { duration: 0.2 } }
    };
    const day = new Date(due).toLocaleString();
    const [expandTask, setExpandTask] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.post('https://tdoc.onrender.com/tasks/delete', { _id, token })
        } catch(err) {
            console.log(err)
        }
        handleDel();
    }
    return (
        <div className={priority === "HIGH" ? "card-surface pinkglow" : "card-surface blueglow"} onClick={() => setExpandTask(!expandTask)} >
            <div className='card-main'>
                <div className='card-title'>{title}</div>
                <div className='card-due'>Due on <span className='due-bold'>{day.split(',')[0]}</span></div>
                <div className='card-desc-box'>
                    <span className='desc-box-desc'>{description}</span>
                </div>
                <motion.div
                    className='card-task-holder'
                    variants={variants}
                    initial="closed"
                    animate={expandTask ? "open" : "closed"}
                >
                    <div className='card-task'>{task}</div>
                </motion.div>
                
            </div>
            <div className='card-footer'>
                <div className={priority === "LOW" ? "footer-mark-done blue" : "footer-mark-done pink"} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        handleDelete();
                    }
                    
                }
                >Mark As Done</div>
            </div>
        </div>
    )
}