import React, { useState } from "react";
import './topbar.css';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";
import Popover from "../popover/Popover";
import { useAppContext } from "../../App";


export default function Topbar() {

    const { change, query, sidebarOpen, setQuery, setChange, setSideBarOpen } = useAppContext();

    const [search, setSearch] = useState('');
    const [topBarOpen, setTopBarOpen] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);

    const [lowPriority, setLowPriority] = useState(query.priority && query.priority === "HIGH" ? false : true);
    const [highPriority, setHighPriority] = useState(query.priority && query.priority === "LOW" ? false : true);
    const [doneTasks, setDoneTasks] = useState(query.done ? true: false);

    const onSave = async () => {
        if (highPriority !== lowPriority) {
            await setQuery!({ priority: highPriority ? "HIGH" : "LOW", done: doneTasks })
        } else {
            await setQuery!({ done: doneTasks })
        }   
        setTopBarOpen(false);
    }
    const onReset = async () => {
        await setQuery!({});
        setLowPriority(true);
        setHighPriority(true);
        setDoneTasks(false);
        setTopBarOpen(false);
    }

    const itemVariants = {
        open: {
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <>
            <div className='topbar'>
                <div className="topbar-mobile-top">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setSideBarOpen!(!sidebarOpen)} width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                        <path d="M4 17H20M4 12H20M4 7H20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <img src={logo} alt="logo" />
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setCreateCategory(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>

                </div>
                <div className='topbar-search-filter'>
                    <div className='topbar-first'>
                        <div className='topbar-search'>
                            <input placeholder='Search' onChange={(e) => {
                                setSearch(e.target.value)
                            }} />
                            <div className="topbar-svg-last"
                                onClick={() => {
                                    setQuery!({ ...query, task: search })
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className='topbar-filter' onClick={() => setTopBarOpen(!topBarOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
                            </svg>

                            <p>Filter</p>
                        </div>
                    </div>
                    <div className='topbar-create-category' onClick={() => setCreateCategory(true)}>Create Category</div>
                </div>
            </div>
            <AnimatePresence>
                {
                    createCategory &&
                    <motion.div
                        className="topbar-actual"
                        variants={itemVariants}
                        initial="closed"
                        animate={createCategory ? "open" : "closed"}
                        exit="closed"
                    >
                        <div className='topbar-overlay-category' onClick={() => setCreateCategory(false)}></div>
                        <Popover handleAdd={() => setChange!(!change)} handleClose={() => setCreateCategory(false)} />
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    topBarOpen &&
                    <motion.div
                        className='topbar-actual'
                        variants={itemVariants}
                        initial="closed"
                        animate={topBarOpen ? "open" : "closed"}
                        exit="closed"
                    >
                        <div className='topbar-overlay-category' onClick={() => setTopBarOpen(false)}></div>
                                <div className='topbar-search-query'>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setTopBarOpen(false)} viewBox="0 0 24 24" fill="currentColor" className="close-svg">
                                    <path fillRule="evenodd" stroke="white" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                </svg>
                                <p className="topbar-filter-heading">Filter</p>
                                <div className="topbar-divided">
                                    <div className="topbar-filter-menu">
                                        <div className="topbar-switch-panel">
                                            <p>Low Priority</p>
                                            <div onClick={() => setLowPriority(!lowPriority)} className={lowPriority ? 'topbar-switch on' : 'topbar-switch off'} >
                                                <div className={lowPriority ? 'topbar-switch-ball on' : 'topbar-switch-ball off'}></div>
                                            </div>
                                        </div>
                                        <div className="topbar-switch-panel">
                                            <p>High Priority</p>
                                            <div onClick={() => setHighPriority(!highPriority)} className={highPriority ? 'topbar-switch on' : 'topbar-switch off'}>
                                                <div className={highPriority ? 'topbar-switch-ball on' : 'topbar-switch-ball off'}></div>
                                            </div>
                                        </div>
                                        <div className="topbar-switch-panel">
                                            <p>Done Tasks</p>
                                            <div onClick={() => setDoneTasks(!doneTasks)} className={doneTasks ? 'topbar-switch on' : 'topbar-switch off'}>
                                                <div className={doneTasks ? 'topbar-switch-ball on' : 'topbar-switch-ball off'}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="topbar-filter-submit">
                                        <div className='topbar-button options-reset' onClick={onReset}>Reset</div>
                                        <div className='topbar-button options-save' onClick={onSave}>Save</div>
                                    </div>
                                </div>
                                </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}