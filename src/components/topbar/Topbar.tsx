import React, { useState } from "react";
import './topbar.css';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";
import Popover from "../popover/Popover";
import { setServers } from "dns";


export default function Topbar({ setOpen, handleAdd, query, setQuery }: any) {

    const [search, setSearch] = useState('');
    const [topBarOpen, setTopBarOpen] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);

    const itemVariants = {
        open: {
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, transition: { duration: 0.2 } }
    };

    const variants = {
        open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.2,
                delayChildren: 0.3,
                staggerChildren: 0.05
            }
        },
        closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
            }
        }
    };

    return (
        <>
        <div className='topbar'>
            <div className="topbar-mobile-top">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={setOpen} width="800px" height="800px" viewBox="0 0 24 24" fill="none">
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
                        onClick= { () => {
                            setQuery({...query, task: search})
                        }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>  
                
                <div className='topbar-filter' onClick={() => setTopBarOpen(!topBarOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                        <path d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                        <Popover handleAdd={handleAdd} handleClose={() => setCreateCategory(false)}/>
                    </motion.div>   
                }
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    className='topbar-search-query'
                    variants={variants}
                    initial="closed"
                    animate={topBarOpen ? "open" : "closed"}
                >
                    
                </motion.div>
            </AnimatePresence>
        </>
    )
}