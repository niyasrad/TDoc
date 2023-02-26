import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png'
import './App.css';
import CardWrapper from './containers/cardwrapper/CardWrapper';
import axios from 'axios';

function App() {

  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    try {
      axios.get('https://tdoc.onrender.com/')
      .then(() => setLoaded(true))
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <div className="App">
      <div className='app-logo'>
        <img src={logo} alt='app-logo'/>
      </div>
      <div className='app-search'>
        
      </div>
      <div className='app-main'>
        {loaded ?
          <>
            <CardWrapper/>
            <div className='app-add-button'></div>
          </> : 
          <>
           <div className="loadingio-spinner-eclipse-mtwzhoupqp"><div className="ldio-ynypg32kjys"></div></div>
          </>
        }
        
      </div>
    </div>
  );
}

export default App;
