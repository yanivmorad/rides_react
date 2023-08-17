import { CssBaseline, Container, Box, Typography, Button, TextField, MenuItem, Select, Alert, CircularProgress, Avatar } from '@mui/material';
import * as React from 'react';
import axios from "axios";
import { useState } from "react";
import { LOGIN, SINGUP } from '../urls';
import { GoogleLogin } from '@react-oauth/google';
import Register from './Register';
import logo  from "../imeges/logo 250.png"
import road from "../imeges/pexels-photoscom-68629.jpg"




export default function LoginPage() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [errorText, setErrorText] = useState("");
const [logInBox,setLogIn] = useState("none");
const [registerBox,setRegister] = useState("none");
const [loading,setLoading] = useState("none");
const [getStarted,setGetStarted] = useState(true);


    const logInSubmit = (event) => {
      if (event) {
        event.preventDefault();
        // Rest of the function logic
      }
        setLoading("block")
        const formData = new FormData();
        console.log("user "+username);
        formData.append('username', username);
        formData.append('password', password);

        axios.post(LOGIN, formData)
        .then((responseData) => {
            if (responseData.status === 200) {
               
            
                localStorage.setItem('access', responseData.data.access);
                localStorage.setItem('refresh', responseData.data.refresh);
                setErrorText(null);
                console.log("seccslte");
                setErrorText(responseData.data)
                setLoading("none")
                window.open('/')
                
            } else {
                setLoading("none")
                setErrorText(responseData.data.detail);
                console.log(responseData.data);

            }
        })
        .catch((error) => {
            setLoading("none")
            if (error.response && error.response.data){console.log(error);
                setErrorText(error.response.data.detail)}
        
            else{
            setErrorText(error.message)}
            
    });
    // const login = useGoogleLogin({
    //   onSuccess: tokenResponse => console.log(tokenResponse),
    // });
    }

    return (
      
        <React.Fragment>
        
           
        <Box
  sx={{
    backgroundImage: `url(${road})`,
    backgroundSize: "cover",
    bgcolor: "#262626",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <Box
    sx={{
      bgcolor: "#FFFFFF",
      p: 2,
      borderRadius: 4,
      boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
    <Typography
      variant="h4"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "cursive",
        fontWeight: 800,
        letterSpacing: ".3rem",
        color: "rgb(179, 0, 0)",
        textDecoration: "none"
      }}
    >
      RidePals
    </Typography>
    <Avatar src={logo}  ></Avatar>
  </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
      {getStarted && (<Button variant="contained" color="primary" sx={{ mb: 2, backgroundColor: 'rgb(0, 80, 158)', color: '#FFFFFF', fontWeight: 'bold', boxShadow: 'none',marginTop:3 }}
        onClick={(event)=>{setLogIn("block")
                         setRegister("none")
                         setGetStarted(false)}}>
          Get Started
        </Button>)}
        

{/* <MyCustomButt onClick={() => login()}>
  Sign in with Google 🚀{' '}
</MyCustomButton>; */}

        <Typography style={{ display: logInBox }} variant="caption" align="center" sx={{ color: '#707070' }}>
          Already have an account?
          <Button color="primary" sx={{ textTransform: 'none', fontWeight: 'bold', ml: 1 }} 
          onClick={(event)=>{setRegister("block"); setLogIn("none");setErrorText("")}}>
            sign up
          </Button>
        </Typography>
        <Typography style={{ display: registerBox }} variant="caption" align="center" sx={{ color: '#707070' }}>
          Already have account?
          <Button color="primary" sx={{ textTransform: 'none', fontWeight: 'bold', ml: 1 }} 
          onClick={(event)=>{setRegister("none"); setLogIn("block")}}>
            sign in
          </Button>
        </Typography>
      </Box>
{/* log in Box  */}
<Box 
  sx={{
    width: 300,
    height: 200,
    // backgroundImage: `url(${logo})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{ display: logInBox }}
>
<CircularProgress
    color="primary"
    sx={{
      position: 'absolute', // Add absolute position to the CircularProgress
      top: '45%',
      left: '45%',
      transform: 'translate(-50%, -50%)', // Translate it to the center

    }}
    size={60}
    style={{ display: loading }}
    
  />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
    <TextField
      required
      id="username"
      label="אימייל"
      value={username}
      onChange={(event) => {
        setUsername(event.target.value);
      }}      variant="standard"
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{width: '200px', "& label": { right: 10 } }}
      
    />
    <TextField
      required
      id="password"
      label="סיסמה"
      type="password"
      value={password}
      onChange={(event) => {setPassword(event.target.value); 
      }}
      variant="standard"
      autoComplete="current-password"
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
     
      sx={{width: '200px', "& label": { right: 10 } }}
      />
      <Button onClick={logInSubmit} variant="contained" sx={{ mt: 2, color: 'white', backgroundColor: 'primary.dark',  }}>
        Login
      </Button>
    </Box>
  
</Box>


{/* register Box */}

<Register
      registerBox={registerBox}
      logIn={logInSubmit}
      setEmail={setUsername}
      setPass={setPassword}
      setErrorText ={setErrorText}
      errorText={errorText}
    />






{errorText && (
  <Alert variant="filled" severity="error">
    {errorText}
  </Alert>
)}
                    </Box>
                    </Box>
        </React.Fragment>
    );
}
