import './App.css';
import LoginPage from './LoginPage';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import { ME, REFRESH } from './urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfilePage from './Profile';
import Home from './Home';
import Offer from './Offer';
import Asks from './Asks';

function App() {
  const [userData, setUserData] = useState(null)

  function sendRequest(url) {
    const token = localStorage.getItem('access')
    if (token) {
    axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
    .then((responseData) => {
        if (responseData.status !== 200) {
        throw responseData.statusText
        } else {
            setUserData(responseData.data)
        }
    })
    .catch((error) => {
        const refreshToken = localStorage.getItem('refresh')
        if (! refreshToken) {
        // the user will have to perforn login
        } else {
        axios.post(REFRESH, {refresh: refreshToken})
        .then((responseData) => {
            if (responseData.status === 200) {
                localStorage.setItem('access', responseData.data.access)
                sendRequest(url)
            }
        })
        .catch()
        }
    })
    } else {

    }
  }
  useEffect(() => {
    sendRequest(ME)
  }, [])


  return (
  
    <Routes>
      {userData ? (
       <Route path="/" element={<Layout user={userData} />}>
        <Route index element={<Home/>}/>
         <Route 
           path="/profile" element={<ProfilePage user={userData} onImgUpload={() => sendRequest(ME)}/>}/>
           <Route path='/offer' element={<Offer token={() => sendRequest(ME)}/>}/>
           <Route path='/asks' element={<Asks/>}/>
       </Route>
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
      

    </Routes>
    
  );
}

export default App;
