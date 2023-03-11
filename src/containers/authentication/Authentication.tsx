import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import './authentication.css';
interface Props{
    onauth: (token : string, username: string) => void
}

export default function Authentication({ onauth } : Props) {

    const [signin, setSignIn] = useState<boolean>(true);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(true);

    const handleSignIn = () => {
        setSignIn(!signin);
    }
    const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const Login = async () => {
        if (usernameOrEmail.length < 5) {
            setErrorMessage("Please enter valid username/e-mail!");
            return;
        } else if (password.length < 8) {
            setErrorMessage("Password must be atleast 8 characters long!")
            return;
        }
        await axios.post("https://tdoc.onrender.com/account/login", {
            emailOrUsername: usernameOrEmail,
            password: password
        })
        .then(
            response => {
                onauth(response.data.token, response.data.username)
            }
        ).catch( 
            err => setErrorMessage(err.response.data.message)
        )
    }
    const SignIn = async () => {
        if (username.length < 5) {
            setErrorMessage("Username must be atleast 5 characters long!");
            return;
        } else if (password.length < 8) {
            setErrorMessage("Password must be atleast 8 characters long!")
            return;
        } else if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid e-mail!");
            return;
        }
        await axios.post("https://tdoc.onrender.com/account/create", {
            email: email,
            username: username,
            password: password
        })
        .then(
            response => {
                onauth(response.data.token, response.data.username)
            }
        ).catch( 
            err => setErrorMessage(err.response.data.message)
        )
    }
    return (
        <div className="auth">
            {
                signin ? 
                <div className="auth-signin">
                    <div className='auth-field'>
                        <span className='above'>Username</span>
                        <input required className='below' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='auth-field'>
                        <span className='above'>E-mail</span>
                        <input required className='below' placeholder='E-Mail' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='auth-field'>
                        <span className='above'>Password</span>
                        <div className='below'>
                            <input type={hidden ? "password" : "text"} required  placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setHidden(!hidden)} fill={hidden ? "none" : "black"} viewBox="0 0 24 24" strokeWidth={1.5}  stroke={hidden ? "black" : "purple"} className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className='error'>{errorMessage}</p>
                    <button type='submit' onClick={SignIn} className='login-signin'>Sign In</button>
                    <p className="login-signin-desc">Already Have an account? <span className="login-signin-hyper" onClick={handleSignIn}>Log In</span></p>
                </div>
                : 
                <div className="auth-login">
                    <div className='auth-field'>
                        <span className='above'>Username/E-Mail</span>
                        <input required className='below' placeholder='Username/E-mail' onChange={(e) => setUsernameOrEmail(e.target.value)}/>
                    </div>
                    <div className='auth-field'>
                        <span className='above'>Password</span>
                        <div className='below'>
                            <input type={hidden ? "password" : "text"} required  placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setHidden(!hidden)} fill={hidden ? "none" : "black"} viewBox="0 0 24 24" strokeWidth={1.5}  stroke={hidden ? "black" : "purple"} className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className='error'>{errorMessage}</p>
                    <button type='submit' onClick={Login} className='login-signin'>Log In</button>
                    <p className="login-signin-desc">Don't have an account? <span className="login-signin-hyper" onClick={handleSignIn}>Sign In</span></p>
                </div>
            }
        </div>
    )
}