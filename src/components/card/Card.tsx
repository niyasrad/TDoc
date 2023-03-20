import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useAppContext } from "../../App";
import './card.css';

interface CardProps{
    _id: string,
    title: string,
    description: string,
    task: string,
    due: Date,
    priority: "HIGH" | "LOW",
    done: boolean
}
export default function Card( { _id, title, description, task, due, priority, done }: CardProps) {

    const { change, setChange } = useAppContext();
    const variants = {
        open: {
            height: "auto",
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 200, damping: 14 }
        },
        closed: { opacity: 0, height: "0", y: -20, transition: { duration: 0.2 } }
    };

    
    const atDue = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime() >= new Date(due).getTime()
    const day = new Date(due).toLocaleString();
    const [expandTask, setExpandTask] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.post('https://tdoc.onrender.com/tasks/delete', { _id })
        } catch(err) {
            console.log(err)
        }
        setChange!(!change)
    }
    return (
        <div className={done ? "card-surface grayglow" : atDue? "card-surface redglow" : priority === "HIGH" ? "card-surface pinkglow" : "card-surface blueglow"} onClick={() => setExpandTask(!expandTask)} >
            <div className='card-main'>
                <div className='card-title'>{title}</div>
                <div className='card-due'>Due on <span className='due-bold'>{day.split(',')[0]}</span></div>
                <div className='card-desc-box'>
                    <span className='desc-box-desc'>{description}</span>
                </div>
                <AnimatePresence>
                {
                    expandTask &&
                    <motion.div
                        className='card-task-holder'
                        variants={variants}
                        initial="closed"
                        animate={expandTask ? "open" : "closed"}
                        exit="closed"
                    >
                        <div className='card-task'>{task}</div>
                    </motion.div>
                }
                </AnimatePresence>
                
            </div>
            <div className='card-footer'>
                <div className={done ? "footer-mark-done black" : atDue ? "footer-mark-done red" :priority === "LOW" ? "footer-mark-done blue" : "footer-mark-done pink"} 
                onClick={
                    (e) => {
                        e.preventDefault();
                        if (!done) {
                            handleDelete();
                        }
                    }
                    
                }
                >Mark As Done</div>
            </div>
        </div>
    )
}