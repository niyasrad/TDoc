import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './popup.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useCardWrapperContext } from "../../containers/cardwrapper/CardWrapper";
import { useAppContext } from "../../App";

export default function Popup({ category }: any) {

    const { change, setChange } = useAppContext(); 
    const { setOpenAddTask } = useCardWrapperContext();


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [severity, setSeverity] = useState('LOW');
    const [checked, setChecked] = useState(false)

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            height: "auto",
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };
    
    const handleCheck = () => {
        setChecked(!checked)
        setSeverity(severity === 'LOW' ? 'HIGH' : 'LOW')
    }

    const handleSubmit = () => {
        if (!title || !description  || !task || !dueDate || !severity) {
          alert('Please fill all fields');
          return;
        }
        const taskBody = {
            title: title,
            description: description,
            task: task, 
            due: dueDate, 
            priority: severity, 
            category: category
        };
        axios.post('https://tdoc.onrender.com/tasks/create', taskBody)
        .then(() => {
            setTitle('');
            setDescription('');
            setTask('');
            setDueDate(new Date());
            setSeverity('');
            setChange!(!change);
        })
        .catch(error => {
            console.log(error);
        })
        setOpenAddTask!({[category.category] : false})
      };

    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <motion.div className="popup" variants={itemVariants} initial="open" exit="closed">
            <div className='popup-text'>Add Task</div>
            <div className='popup-wrapper'>
                <div className='popup-title field'>
                    <span className='above'>Title</span>
                    <input required className='below' placeholder='Investigate response' onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='popup-desc field'>
                    <span className='above'>Task Description</span>
                    <input required className='below' placeholder='Description of the task..' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className='popup-task field'>
                    <span className='above'>Task</span>
                    <input required className='below' placeholder='Assigned Task..' onChange={(e) => setTask(e.target.value)}/>
                </div>
                <div className='popup-due field'>
                    <span className='above'>Due Date</span>
                    <DatePicker selected={startDate} onChange={(date: Date) => {
                        setStartDate(date)
                        setDueDate(date)
                    } }/>
                </div>
                <div className='popup-severity'>
                    <span className='above'>Mark High Priority</span>
                    <input onClick={handleCheck} checked={checked} type="checkbox"/>
                </div>
            </div>
            <div className='popup-select'>
                <div className='CANCEL popup-button' onClick={() => setOpenAddTask!({[category.category] : false})}>Cancel</div>
                <div className='ADD popup-button' onClick={handleSubmit}>Add</div>
            </div>
        </motion.div>
    )
}