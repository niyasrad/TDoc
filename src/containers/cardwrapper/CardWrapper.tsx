import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Popup from "../../components/popup/Popup";
import './cardwrapper.css';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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
    handleDel: any,
    done: boolean
}

interface Props {
    token: string,
    handleSignOut: any;
    change: boolean;
    query: any;
}

export default function CardWrapper({ token, handleSignOut, change, query }: Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState([])
    const [startDate, setStartDate] = useState(new Date());
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
    }, [query, forcedUpdate, change])
    return (
        <>
            <div className='card-wrapper'>
                {
                    items &&
                    items.map((category: any) => (
                        <>
                            {category.category &&
                                <div className="card-wrappercategory">
                                    <div className="wrappercategory-svgs">
                                    <motion.svg 
                                        onClick={() => {
                                            toggleCategory(category.category)
                                            console.log("clicked")
                                        }}
                                        variants={dropDownVariant}
                                        initial="closed"
                                        animate={openCategories[category.category] ? "open" : "closed"}
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                    </motion.svg>
                                    </div>
                                    <p>{category.category}</p>
                                    <div className="wrappercategory-svgs">
                                        <svg
                                            onClick={() => {
                                                toggleEditCategory(category.category)
                                                console.log("clicked")
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                        </svg>
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
                                                    done={card.done}
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
                                                    <Popup handleClick={() => setOpenAddTask({[category.category] : false})} addTask={handleAdd} token={token} category={category.category} />
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