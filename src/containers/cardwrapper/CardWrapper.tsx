import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Popup from "../../components/popup/Popup";
import DatePicker from "react-datepicker";
import './cardwrapper.css';
import { myData } from "./data";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import add from '../../assets/add.png';

export interface CardItems {
    _id: string
    title: string,
    description: string,
    task: string,
    due: Date,
    priority: 'LOW' | 'HIGH',
    category: string,
    handleDel: any
}

interface Props {
    token: string,
    handleSignOut: any
}

export default function CardWrapper({ token, handleSignOut }: Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [query, setQuery] = useState<any>({});
    const [forcedUpdate, setForced] = useState<boolean>(false);

    const dropDownVariant = {
        open: {
            rotateX: 180,
            transition: { duration: 0.5 }
        }, 
        closed: {
            rotateX: 0,
            transition: { duration: 0.5 }
        }
    }
    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            height: "auto",
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, height: 0, transition: { duration: 0.2 } }
    };

    const handleAdd = () => {
        setForced(!forcedUpdate);
    }
    const handleClick = () => {
        setOpen(!open);
    }
    const handleDel = () => {
        setForced(!forcedUpdate)
    }

    const [openCategories, setOpenCategories] = useState<any>({});

    const toggleCategory = (category: string) => {
        setOpenCategories({
            ...openCategories,
            [category]: !openCategories[category],
        });
        console.log(openCategories)
    };

    useEffect(() => {
        axios.post('https://tdoc.onrender.com/tasks/list', { ...query, token })
            .then((res) => res.data)
            .then((data) => {
                setItems(data.tasks)
                if (data.tasks && data.tasks.length > 0) {
                    setOpenCategories({ [data.tasks[0].category] : true })
                }
                
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
                    items.map((category: any) => (
                        <div className="card-wrapper-div">
                            {category.category &&
                                <div className="card-wrappercategory">
                                    <p>{category.category}</p>
                                    <div className="wrappercategory-svgs">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                            <path d="M13 21H21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.3096 5.30981L18.7273 8.72755" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path opacity="0.1" d="M18.556 8.90942L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L15.0647 5.35974C15.0742 5.4062 15.0969 5.45049 15.1329 5.48653L18.5506 8.90426C18.5524 8.90601 18.5542 8.90773 18.556 8.90942Z" fill="#323232" />
                                        </svg>
                                        <motion.svg xmlns="http://www.w3.org/2000/svg" 
                                            onClick={() => {
                                                toggleCategory(category.category)
                                                console.log("clicked")
                                            }}
                                            variants={dropDownVariant}
                                            initial="closed"
                                            animate={openCategories[category.category] ? "open" : "closed"}
                                            width="800px" height="800px" viewBox="0 0 48 48" fill="none">
                                            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                                            <path d="M40 28L24 40L8 28" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8 10H40" stroke="#000000" stroke-width="4" stroke-linecap="round" />
                                            <path d="M8 18H40" stroke="#000000" stroke-width="4" stroke-linecap="round" />
                                        </motion.svg>
                                    </div>
                                </div>

                            }
                            <AnimatePresence>
                                {openCategories[category.category] &&

                                    <motion.div
                                        className="card-wrapperitems"
                                        variants={itemVariants}
                                        initial="closed"
                                        animate={openCategories[category.category] ? "open" : "closed"}
                                        exit="closed"
                                    >
                                        {category.tasks ?
                                            category.tasks.map((card: CardItems) => (
                                                <Card
                                                    _id={card._id}
                                                    title={card.title}
                                                    description={card.description}
                                                    task={card.task}
                                                    due={card.due}
                                                    priority={card.priority}
                                                    handleDel={handleDel}
                                                    token={token}
                                                />
                                            ))
                                            : 
                                            <p>No Tasks Added!</p>  
                                        }
                                        <img src={add} alt="add-new-task" onClick={() => setOpen(true)} className="add-new-task-img"/>
                                    </motion.div>
                                }
                            </AnimatePresence>

                        </div>
                    ))
                }
                <div onClick={handleClick} className='card-wrapper-add'>Add Task</div>
                {open && <Popup handleClick={handleClick} addTask={handleAdd} token={token} />}
            </div>
        </>
    )
}