import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './popup.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Popup({ addTask, handleClick }: any) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [severity, setSeverity] = useState('LOW');
    const [checked, setChecked] = useState(false)


    const handleCheck = () => {
        setChecked(!checked)
        setSeverity(severity === 'LOW' ? 'HIGH' : 'LOW')
    }

    const handleSubmit = () => {
        if (!title || !tags || !description || !assignee || !task || !dueDate || !severity) {
          alert('Please fill all fields');
          return;
        }
        const taskBody = {
            title: title,
            assignees: assignee.split(",").map((assignee) => assignee.trim()),
            description: description,
            task: task, 
            due: dueDate, 
            priority: severity, 
            tags:tags.split(",").map((tag) => tag.trim())
        };
        axios.post('https://tdoc.onrender.com/task', taskBody)
        .then(response => {
            console.log(response);
            setTitle('');
            setTags('');
            setDescription('');
            setAssignee('');
            setTask('');
            setDueDate(new Date());
            setSeverity('');
            addTask();
        })
        .catch(error => {
            console.log(error);
        })
        handleClick();
      };

    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <>
        <div className='popup-layer'></div>
        <div className='popup'>
            <div className='popup-text'>Add Task</div>
            <div className='popup-wrapper'>
                <div className='popup-title field'>
                    <span className='above'>Title</span>
                    <input required className='below' placeholder='Investigate response' onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='popup-tags field'>
                    <span className='above'>Filter Tags</span>
                    <input required className='below' placeholder='mark, backend' onChange={(e) => setTags(e.target.value)} />
                </div>
                <div className='popup-desc field'>
                    <span className='above'>Task Description</span>
                    <input required className='below' placeholder='Description of the task..' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className='popup-assignee field'>
                    <span className='above'>Filter Assignee</span>
                    <input required className='below' placeholder='SDE, SDE-INTERN' onChange={(e) => setAssignee(e.target.value)}/>
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
                <div className='CANCEL' onClick={handleClick}>Cancel</div>
                <div className='ADD' onClick={handleSubmit}>Add Task</div>
            </div>
            
        </div>
        </>
    )
}