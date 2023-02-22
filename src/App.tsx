import React from 'react';
import logo from './assets/logo.png'
import './App.css';
import CardWrapper from './containers/cardwrapper/CardWrapper';

function App() {
  return (
    <div className="App">
      <div className='app-logo'>
        <img src={logo} alt='app-logo'/>
      </div>
      <div className='app-search'>
        
      </div>
      <div className='app-main'>
        <CardWrapper/>
        <div className='app-add-button'></div>
      </div>
    </div>
  );
}

export default App;
