import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png'
import './App.css';
import CardWrapper from './containers/cardwrapper/CardWrapper';
import axios, { AxiosError } from 'axios';
import Authentication from './containers/authentication/Authentication';
import { setTokenSourceMapRange } from 'typescript';

function App() {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [authenticated, setAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      axios.get('https://tdoc.onrender.com/')
      .then(() => {
        setLoaded(true)
        if (token) setToken(token)
        setAuth(true)
      })
      .catch(err => {
        if (err.response.status === 401) {
          setAuth(false)
          setToken('')
        }
      })
    } catch (err) {
      console.log(err);
    }
  }, [])

  const onAuth = async (token : string) => {
    await setToken(token);
    localStorage.setItem('token', token);
    setAuth(true);
  }
  return (
    <div className="App">
      <div className='app-logo'>
        <img src={logo} alt='app-logo'/>
      </div>
      <div className='app-search'>
        
      </div>
      <div className='app-main'>
        {loaded ?
          authenticated ? 
            <CardWrapper token={token}/>
            :
            <Authentication onauth={onAuth} />
           : 
          <div className="app-center">
            <div className="loadingio-spinner-eclipse-hudbooqsn0d"><div className="ldio-c1dvvx8rgm">
            <div></div>
            </div></div>
          </div>
        }
        
      </div>
    </div>
  );
}

export default App;
