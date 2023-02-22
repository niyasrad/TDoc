import React, { useState } from "react";
import './popup.css';

export default function Popup({ addTask, handleClick, nextId }: any) {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [severity, setSeverity] = useState('');

    const handleSubmit = () => {
        if (!title || !tags || !description || !assignee || !task || !dueDate || !severity) {
          alert('Please fill all fields');
          return;
        }
        addTask({id: nextId, title: title, assignees: assignee.split(",").map((assignee) => assignee.trim()), description: description, task: task, due: dueDate, priority: severity, tags:tags.split(",").map((tag) => tag.trim())});
        setTitle('');
        setTags('');
        setDescription('');
        setAssignee('');
        setTask('');
        setDueDate('');
        setSeverity('');
        handleClick();
      };

    return (
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
                    <input required className='below' placeholder='06-02-2023' onChange={(e) => setDueDate(e.target.value)}/>
                </div>
                <div className='popup-severity field'>
                    <span className='above'>Severity</span>
                    <input required className='below' placeholder='HIGH' onChange={(e) => setSeverity(e.target.value)} />
                </div>
            </div>
            <div className='popup-select'>
                <div className='CANCEL' onClick={handleClick}>Cancel</div>
                <div className='ADD' onClick={handleSubmit}>Add Task</div>
            </div>
            
        </div>
    )
}