import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAppContext } from "../../App";
import { useTopbarContext } from "../topbar/Topbar";
import './popover.css';


export default function Popover() {

    const { change, setChange } = useAppContext();
    const { setCreateCategory } = useTopbarContext();
    const [name, setName] = useState<string>('');
    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            height: "auto",
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const handleCreate = async () => {
        if (name.length < 3) return;
        else {
            try {
                await axios.post('https://tdoc.onrender.com/categories/create', { category: name })
                .finally(() => {
                    setChange!(!change);
                    setCreateCategory!(false)
                })
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    return (
        <motion.div className="popover" variants={itemVariants} initial="open" exit="closed">
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setCreateCategory!(false)} viewBox="0 0 24 24" fill="currentColor" className="close-svg">
                <path fillRule="evenodd" stroke="white" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>

            <span className='popover-heading'>Create Category</span>
            <div className='popover-main'>
                <span className='popover-sub'>Category Name</span>
                <input required className='popover-field' placeholder='E.g. Work, Private' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='popover-options'>
                <div className='popover-button options-cancel' onClick={() => setCreateCategory!(false)}>Cancel</div>
                <div className='popover-button options-create' onClick={handleCreate}>Create</div>
            </div>
        </motion.div>  
    )
}