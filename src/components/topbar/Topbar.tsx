import React, { useState } from "react";
import './topbar.css';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";
import Popover from "../popover/Popover";


export default function Topbar({ setOpen }: any) {

    const [query, setQuery] = useState<any>({});
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
        <div className='topbar'>
            <div className="topbar-mobile-top">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={setOpen} width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M4 17H20M4 12H20M4 7H20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <img src={logo} alt="logo" />
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setCreateCategory(true)} width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M15 12H12M12 12H9M12 12V9M12 12V15M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>
            <div className='topbar-search-filter'>
                <div className='topbar-first'>
                <input className='topbar-search' placeholder='Search Task' onChange={(e) => {
                    setQuery({ ...query, task: e.target.value })
                }} />
                <div className='topbar-filter' onClick={() => setTopBarOpen(!topBarOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                        <path d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>Filter</p>
                </div>
                </div>
                <div className='topbar-create-category' onClick={() => setCreateCategory(true)}>Create Category</div>
                
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
                        <Popover />
                    </motion.div>   
                }
                </AnimatePresence>

               
                
            </div>
            <AnimatePresence>
                <motion.div
                    className='topbar-search-query'
                    variants={variants}
                    initial="closed"
                    animate={topBarOpen ? "open" : "closed"}
                >
                    
                </motion.div>
            </AnimatePresence>

        </div>
    )
}