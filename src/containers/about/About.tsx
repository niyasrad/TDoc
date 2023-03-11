import React from "react";
import logo from '../../assets/logo.png';
import './about.css';

export default function About({ setOpen }: any) {
    return (
        <div className="about-page">  
            <svg xmlns="http://www.w3.org/2000/svg" onClick={setOpen} className="about-svg" viewBox="0 0 24 24" fill="none">
                <path d="M4 17H20M4 12H20M4 7H20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <img src={logo} alt="logo" className="logo"/>
            <div className="section about-about">
                <h1>About</h1>
                <p>Introducing the Task Doctor - your personal task management solution! Built on top of React, MongoDB, Express! Built by a passionate developer, Niyas Hameed. I'm currently doing my best to become a well trained full-stack developer.</p>
                <p className="important">Apache 2.0 Licensed by @niyasrad</p>
                <p className="important">You can check my projects here! <a href="https://github.com/niyasrad" target="_blank">Redirect to GitHub</a></p>
            </div>
            
        </div>
    )
}