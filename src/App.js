import './App.css';
import Layout from './project/Layout';
import { Route, Routes } from 'react-router-dom';
import { ME, REFRESH } from './project/urls';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfilePage from './project/Profile';
import Home from './project/home/Home.js';
import RideDetails from './project/RideDetails';
import Test from './project/test';
import LoginPage from './project/logInPage/LoginPage';
import MyRide from './project/MyRide';
import Asks from './project/newRide/Asks';
import Offer from './project/newRide/Offer';
import FriendsPage from './project/friendPage/FriendsPage';

function App() {
  const [userData, setUserData] = useState(null)
  console.log(userData);

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
        <Route index element={<Home me={userData}/>}
        />
         <Route 
           path="/profile" element={<ProfilePage user={userData} onImgUpload={() => sendRequest(ME)}/>}/>
           <Route path='/offer' element={<Offer token={() => sendRequest(ME)}/>}/>
           <Route path='/friends' element={<FriendsPage/>}/>
           <Route path='/myRide' element={<MyRide me={userData}/>}/>



           <Route path='/asks' element={<Asks/>}/>
           <Route path='/ride/:id' element={<RideDetails me={userData} />} />

       </Route>
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}
                 <Route path='test' element={<Test />} />

      

    </Routes>
    
  );
}

export default App;
