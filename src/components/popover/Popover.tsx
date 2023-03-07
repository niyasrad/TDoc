import { motion } from "framer-motion";
import React, { useState } from "react";
import './popover.css';


export default function Popover() {

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

    return (
        <motion.div className="popover" variants={itemVariants} initial="open" exit="closed">
            <span className='popover-heading'>Create Category</span>
            <div className='popover-main'>
                <span className='popover-sub'>Category Name</span>
                <input required className='popover-field' placeholder='E.g. Work, Private' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='popover-options'>
                <div className='popover-button options-cancel'>Cancel</div>
                <div className='popover-button options-create'>Create</div>
            </div>
        </motion.div>  
    )
}