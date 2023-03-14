import React, { useState } from "react";
import './sidebar.css';
import logo from '../../assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../App";

interface Props {
    open: boolean,
    setOpen: any,
    handleSignOut: any,
    username: string,
    change: any
}

export default function Sidebar() {

    const { username, sidebarOpen, setWrapper, setSideBarOpen, handleSignOut } = useAppContext();

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
            <div className={ sidebarOpen ?"sidebar-bg active": "sidebar-bg"} onClick={() => setSideBarOpen!(!sidebarOpen)}></div>
            <motion.div
                className="sidebar-mobile"
                variants={variants}
                initial="closed"
                animate={sidebarOpen ? "open" : "closed"}
            >

                <img className="sidebar-logo" src={logo} alt="logo" />
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setSideBarOpen!(!sidebarOpen)} width="40px" height="40px" viewBox="0 0 24 24" fill="currentColor" className="sidebar-svg">
                    <path fillRule="evenodd" fill="currentColor" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
                <div className="sidebar-select-wrap">
                    <div className="sidebar-selector" onClick={() => {
                        setTasks(true);
                        setAbout(false);
                        setWrapper!(true);
                    }

                    }>
                        <div className={tasks ? "selector-option active" : "selector-option"} >
                            Tasks
                        </div>
                        <div className="selector-bg"></div>

                    </div>
                    <div className="sidebar-selector" onClick={
                        () => {
                            setTasks(false);
                            setAbout(true);
                            setWrapper!(false);
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
                        {username}
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
                        setWrapper!(true);
                    }

                    }>
                        <div className={tasks ? "selector-option active" : "selector-option"} >
                            Tasks
                        </div>
                        <div className="selector-bg"></div>

                    </div>
                    <div className="sidebar-selector" onClick={
                        () => {
                            setTasks(false);
                            setAbout(true);
                            setWrapper!(false);
                        }
                    }>
                        <div className={about ? "selector-option active" : "selector-option"} >
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
                        {username}
                    </div>
                    <div className="user-signout" onClick={handleSignOut}>
                        Sign Out
                    </div>
                </div>
            </div>
        </>
    )
}