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
import CategoryPopover from "../../components/category-popover/CategoryPopover";

export interface CardItems {
    _id: string
    title: string,
    description: string,
    task: string,
    due: Date,
    priority: 'LOW' | 'HIGH',
    category: string,
    bogus?: boolean,
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
            transition: { duration: 0.5 },
        },
        closed: {
            rotateX: 0,
            transition: { duration: 0.5 }
        }
    }
    const bgVariant = {
        open: {
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, transition: { duration: 0.2 } }
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
    const [openEditCategories, setOpenEditCategories] = useState<any>({});
    const [openCategories, setOpenCategories] = useState<any>({});
    const [openAddTask, setOpenAddTask] = useState<any>({});

    const toggleCategory = (category: string) => {
        setOpenCategories({
            ...openCategories,
            [category]: !openCategories[category],
        });
        console.log(openCategories)
    };

    const toggleEditCategory = (category: string) => {
        setOpenEditCategories({
            ...openEditCategories,
            [category]: !openEditCategories[category],
        });
    };

    useEffect(() => {
        axios.post('https://tdoc.onrender.com/tasks/list', { ...query, token })
            .then((res) => res.data)
            .then((data) => {
                setItems(data.tasks)
                if (data.tasks && data.tasks.length > 0) {
                    setOpenCategories({ [data.tasks[0].category]: true })
                    setOpenAddTask({ [data.tasks[0].category]: false})
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
                        <>
                            {category.category &&
                                <div className="card-wrappercategory">
                                    <p>{category.category}</p>
                                    <div className="wrappercategory-svgs">
                                        <svg 
                                            onClick={() => {
                                                toggleEditCategory(category.category)
                                                console.log("clicked")
                                            }}
                                            
                                            xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
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
                                                !card.bogus ? <Card
                                                    _id={card._id}
                                                    title={card.title}
                                                    description={card.description}
                                                    task={card.task}
                                                    due={card.due}
                                                    priority={card.priority}
                                                    handleDel={handleDel}
                                                    token={token}
                                                /> : null
                                            ))
                                            :
                                            <p>No Tasks Added!</p>
                                        }
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOpenAddTask({[category.category] : true})} className="add-new-task-img" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                        <AnimatePresence>
                                            {
                                                openAddTask[category.category]  &&
                                                <motion.div
                                                    variants={bgVariant}
                                                    initial="closed"
                                                    animate={openAddTask[category.category] ? "open" : "closed"}
                                                    exit="closed"
                                                    className="card-absolute"
                                                >
                                                    <div className='card-add-task-bg' onClick={() => setOpenAddTask({[category.category] : false})}></div>      
                                                    <Popup handleClick={() => setOpenAddTask({[category.category] : false})} addTask={handleAdd} token={token} prevName={category.category} />
                                                </motion.div>
                                            }
                                        </AnimatePresence>
                                    </motion.div>
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {
                                    openEditCategories[category.category]  &&
                                    <motion.div
                                        variants={bgVariant}
                                        initial="closed"
                                        animate={openEditCategories[category.category] ? "open" : "closed"}
                                        exit="closed"
                                        className="card-absolute"
                                    >
                                        <div className='card-add-task-bg' onClick={() => setOpenEditCategories({[category.category] : false})}></div>      
                                        <CategoryPopover handleClose={() => setOpenEditCategories({[category.category] : false})} addTask={handleAdd} token={token} prevName={category.category} />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </>
                    ))
                }

            </div>
        </>
    )
}