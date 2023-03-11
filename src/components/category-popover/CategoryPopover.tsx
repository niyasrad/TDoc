import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import '../popover/popover.css';

export default function CategoryPopover({ handleClose, prevName, addTask }: any) {

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

    const handleDelete = async () => {
        try {
            await axios.post('https://tdoc.onrender.com/categories/delete', { category: prevName })
                .finally( () => {
                    addTask();
                    handleClose();
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = async () => {
        if (name.trim() === prevName) {
            handleClose();
        }
        else {
            try {
                await axios.post('https://tdoc.onrender.com/categories/rename', { category: prevName, newCategory: name })
                    .finally(() => {
                        addTask();
                        handleClose();
                    })
            } catch (error) {
                console.log(error)
            }

        }
    }

    return (
        <motion.div className="popover" variants={itemVariants} initial="open" exit="closed">
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClose} viewBox="0 0 24 24" fill="currentColor" className="close-svg">
                <path fillRule="evenodd" stroke="white" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
            <div className="popover-top">
                <span className='popover-heading'>Edit Category</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleDelete} viewBox="0 0 24 24" strokeWidth={1.5} stroke="red"  className="popover-options-delete">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>

            <div className='popover-main'>
                <span className='popover-sub'>Category Name</span>
                <input required className='popover-field' placeholder={prevName} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='popover-options'>
                <div className='popover-button options-cancel' onClick={handleClose}>Cancel</div>
                <div className='popover-button options-create' onClick={handleChange}>Save</div>
            </div>
        </motion.div>
    )
}