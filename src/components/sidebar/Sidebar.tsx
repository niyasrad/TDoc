import React, { useState } from "react";
import './sidebar.css';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    open: boolean,
    setOpen: any,
    handleSignOut: any
}

export default function Sidebar({ open, setOpen, handleSignOut }: Props) {

    const [tasks, setTasks] = useState(true);
    const [about, setAbout] = useState(false);

    const variants = {
        open: ({
            x: "0",
            transition: {
              duration: 0.4,
              type: "spring",
            }
          }),
          closed: {
            x: "-100%",
            transition: {
              duration: 0.4,
              type: "spring",
              stiffness: 400,
              damping: 40,

            }
          }
    };


    return (
        <>
            <div className={ open ?"sidebar-bg active": "sidebar-bg"} onClick={setOpen}></div>
            <motion.div
                className="sidebar-mobile"
                variants={variants}
                initial="closed"
                animate={open ? "open" : "closed"}
            >

                <img className="sidebar-logo" src={logo} alt="logo" />
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" className="sidebar-svg" onClick={setOpen} viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_429_11079)">
                        <path d="M4 4.00098H20V18.001C20 19.1055 19.1046 20.001 18 20.001H6C4.89543 20.001 4 19.1055 4 18.001V4.00098Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 10.0001L10 14.0001" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10.0001L14 14.0001" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_429_11079">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <div className="sidebar-select-wrap">
                    <div className="sidebar-selector" onClick={() => {
                        setTasks(true);
                        setAbout(false);
                    }

                    }>
                        <div className={tasks ? "selector-option active" : "selector-option"}>
                            Tasks
                        </div>
                        <div className="selector-bg"></div>

                    </div>
                    <div className="sidebar-selector" onClick={
                        () => {
                            setTasks(false);
                            setAbout(true);
                        }
                    }>
                        <div className={about ? "selector-option active" : "selector-option"}>
                            About

                        </div>
                        <div className="selector-bg"></div>
                    </div>
                </div>

                <div className="sidebar-user">
                    <div className="user-username">
                        <svg xmlns="http://www.w3.org/2000/svg" className="user-svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.1" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" fill="#323232" />
                            <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="#323232" stroke-width="2" />
                            <path d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" stroke="#323232" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        radextrem
                    </div>
                    <div className="user-signout" onClick={handleSignOut}>
                        Sign Out
                    </div>
                </div>
            </motion.div>
            <div className="sidebar">
                <img className="sidebar-logo" src={logo} alt="logo" />
                <div className="sidebar-select-wrap">
                    <div className="sidebar-selector" onClick={() => {
                        setTasks(true);
                        setAbout(false);
                    }

                    }>
                        <div className={tasks ? "selector-option active" : "selector-option"}>
                            Tasks
                        </div>
                        <div className="selector-bg"></div>

                    </div>
                    <div className="sidebar-selector" onClick={
                        () => {
                            setTasks(false);
                            setAbout(true);
                        }
                    }>
                        <div className={about ? "selector-option active" : "selector-option"}>
                            About

                        </div>
                        <div className="selector-bg"></div>
                    </div>
                </div>

                <div className="sidebar-user">
                    <div className="user-username">
                        <svg xmlns="http://www.w3.org/2000/svg" className="user-svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.1" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" fill="#323232" />
                            <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="#323232" stroke-width="2" />
                            <path d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21" stroke="#323232" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        radextrem
                    </div>
                    <div className="user-signout" onClick={handleSignOut}>
                        Sign Out
                    </div>
                </div>
            </div>
        </>
    )
}