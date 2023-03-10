import React, { useEffect, useState, createContext, useContext, SetStateAction, Dispatch } from 'react';
import logo from './assets/logo.png'
import './App.css';
import CardWrapper from './containers/cardwrapper/CardWrapper';
import axios, { AxiosError } from 'axios';
import Authentication from './containers/authentication/Authentication';
import Sidebar from './components/sidebar/Sidebar';
import { setTokenSourceMapRange } from 'typescript';
import Cookies from 'js-cookie';
import Topbar from './components/topbar/Topbar';
import About from './containers/about/About';


interface AppContextType {
  username: string,
  sidebarOpen: boolean,
  query: any,
  change: boolean,
  setWrapper?: Dispatch<SetStateAction<boolean>>,
  setSideBarOpen?: Dispatch<SetStateAction<boolean>>,
  setChange?: Dispatch<SetStateAction<boolean>>,
  setQuery?: Dispatch<SetStateAction<any>>,
  handleSignOut?: () => void,
  onAuth?: (token: string, username: string) => Promise<void>
}

const defaultContext = {
  username: "",
  sidebarOpen: false,
  query: {},
  change: false
}

const AppContext = createContext<AppContextType>(defaultContext)

export const useAppContext = () => useContext(AppContext)


function App() {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [authenticated, setAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('User');
  const [change, setChange] = useState<boolean>(false);
  const [wrapper, setWrapper] = useState<boolean>(true);
  const [query, setQuery] = useState<any>({});

  const tips = [
    "Use the Categories to keep your tasks aligned and organized.",
    "If you do not clear the tasks before the due, you'll be given alerts.",
    "The UI Reacts to the alerts, due and priorities of your task.",
    "If you need motivation, remember you have tasks to do!",
    "The tasks are filtered through the filter options, near the search!"
  ]

  const index = Math.floor(Math.random() * (4 - 0)) + 0;

  const handleSignOut = () => {
    setAuth(false)
    setToken('')
    Cookies.remove('token');
  }
  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  useEffect(() => {
    try {
      const token = Cookies.get('token');;
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      axios.get('https://tdoc.onrender.com/')
        .then(async (res) => {
          await sleep(2000)
          setUsername(res.data.username);
          setLoaded(true)
          if (token) setToken(token)
          setAuth(true)
        })
        .catch(err => {
          if (err.response.status === 401) {
            setAuth(false)
            setLoaded(true)
            setToken('')
            Cookies.remove('token');
          }
          if (err.response.status === 400) {
            setAuth(false)
            setLoaded(true)
            setToken('')
            Cookies.remove('token');
          }
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  const onAuth = async (token: string, username: string) => {
    await setToken(token);
    await setUsername(username);
    Cookies.set('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuth(true);
  }

  return (
    <AppContext.Provider value={{
      username,
      sidebarOpen: sideBarOpen,
      query,
      change,
      setWrapper,
      setSideBarOpen,
      setChange,
      setQuery,
      handleSignOut,
      onAuth
    }}>
      <div className="App">
        <div className='app-main'>
          {loaded ?
            authenticated ?
              <>
                <Sidebar />
                {
                  wrapper ?
                    <>
                      <Topbar />
                      <CardWrapper />
                    </>
                    :
                    <About />
                }
              </>
              :
              <div className='app-real'>
                <div className='app-logo'>
                  <img src={logo} alt='app-logo' />
                </div>
                <Authentication />
              </div>
            :
            <>
              <div className="app-real">
                <div className='app-logo'>
                  <img src={logo} alt='app-logo' />
                </div>
                <div className="app-center">
                  <div className="loadingio-spinner-eclipse-hudbooqsn0d"><div className="ldio-c1dvvx8rgm">
                    <div></div>
                  </div></div>
                  <div className="app-bottom">
                    <div className="app-center-loading-text">Connecting with the Server</div>
                    <div className="app-center-tip-container">
                      <div className="app-center-tip-text">{tips[index]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }

        </div>
      </div>
    </AppContext.Provider>

  );
}

export default App;
