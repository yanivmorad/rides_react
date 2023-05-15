import { CssBaseline, Container, Box, Typography, Button, TextField, MenuItem, Select, Alert, CircularProgress } from '@mui/material';
import * as React from 'react';
import axios from "axios";
import { useState } from "react";
import { LOGIN, SINGUP } from './urls';
import { GoogleLogin } from '@react-oauth/google';




export default function LoginPage() {
    const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [errorText, setErrorText] = useState("");
const [logInBox,setLogIn] = useState("none");
const [registerBox,setRegister] = useState("none");
const [loading,setLoading] = useState("none");
const [first_name, setFirstName] = useState("");
const [last_name, setLastName] = useState("");
const [address, setAddress] = useState("");
const [gender, setGender] = useState("");
const [picture_url, setPictureUrl] = useState("");

    const registerSubmit = (event) => {
        event.preventDefault();
        setLoading("block")
      
        const requestBody = {
            email: username,
            password:password,
            first_name: first_name,
            last_name: last_name,
            profile: {
              picture_url: picture_url,
              address: address,
              gender: gender,
            }
          };
      
        axios.post(SINGUP, requestBody)
        .then((responseData) => {
          if (responseData.status === 201) {
            setLoading("none")
            window.open('/', '_self')
          } else {
            setErrorText(responseData.data.detail)
            setLoading("none")
          }
        })
        .catch((error) => {
            setLoading("none")
            if (error.response && error.response.data) {
                const errorMessages = [];
                for (const [key, value] of Object.entries(error.response.data)) {
                  if (Array.isArray(value)) {
                    value.forEach((message) => {
                      errorMessages.push(`${key}: ${message}`);
                    });
                  } else {
                    errorMessages.push(`${key}: ${value}`);
                  }
                }
                setErrorText(errorMessages.join('\n'));
              } else {
                console.log(error);
                setErrorText(error.message)
              }
            if (error.response.data) {
              //Server responded with an error status code
              console.log("Server responded with an error status code");
              console.log(error.response)
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // Request was made but no response was received
              console.log("Request was made but no response was received");
              console.log(error.request);
            } else {
              // Something else happened while setting up the request
              console.log("Something else happened while setting up the request");
              console.log('Error', error.message);
            }
          });
       
      };

    const logInSubmit = (event) => {
        event.preventDefault();
        setLoading("block")
        const formData = new FormData();
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
        
            <CssBaseline />
  <Box sx={{ bgcolor: '#262626', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ bgcolor: '#FFFFFF', p: 4, borderRadius: 4, boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#262626', fontWeight: 'bold', letterSpacing: 4 }}>
        RideWithMe
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Button variant="contained" color="primary" sx={{ mb: 2, backgroundColor: '#FF7F50', color: '#FFFFFF', fontWeight: 'bold', boxShadow: 'none' }}onClick={(event)=>{setLogIn("block")
                         setRegister("none")}}>
          Get Started
        </Button>
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>


{/* <MyCustomButt onClick={() => login()}>
  Sign in with Google 🚀{' '}
</MyCustomButton>; */}

        <Typography variant="caption" align="center" sx={{ color: '#707070' }}>
          Already have an account?
          <Button color="primary" sx={{ textTransform: 'none', fontWeight: 'bold', ml: 1 }} onClick={(event)=>{setRegister("block") 
                        setLogIn("none")}}>
            Log In
          </Button>
        </Typography>
      </Box>

{/* log in Box  */}
<Box 
  sx={{
    width: 300,
    height: 200,
    backgroundColor: 'white',
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
      top: '50%',
      left: '50%',
      transform: 'translate(-40%, -60%)', // Translate it to the center

    }}
    style={{ display: loading }}
  />
  <form onSubmit={logInSubmit}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      <TextField
        required
        id="username"
        label="Email"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        variant="standard"
      />
       
      <TextField
        required
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        variant="standard"
        autoComplete="current-password"
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2, color: 'white', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#283593' } }}>
        Login
      </Button>
    </Box>
  </form>
</Box>


{/* register Box */}
<Box 
  sx={{
    width: 300,
    height: 450,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{ display: registerBox }}

>
<CircularProgress
    color="primary"
    sx={{
      position: 'absolute', // Add absolute position to the CircularProgress
      top: '50%',
      left: '50%',
      transform: 'translate(-40%, -60%)', // Translate it to the center

    }}
    style={{ display: loading }}
  />
  <form onSubmit={registerSubmit}>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <TextField
      required
      id="username"
      label="Email"
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      variant="standard"
      
    />
    <TextField
      required
      id="password"
      label="Password"
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      variant="standard"
      autoComplete="current-password"
      />
    <TextField
      required
      id="first_name"
      label="First Name"
      value={first_name}
      onChange={(event) => setFirstName(event.target.value)}
      variant="standard"
      sx={{ color: 'yellow' }}
    />
    <TextField
      required
      id="last_name"
      label="Last Name"
      value={last_name}
      onChange={(event) => setLastName(event.target.value)}
      variant="standard"
      sx={{ color: 'yellow' }}
    />
    <TextField
      id="address"
      label="Address"
      value={address}
      onChange={(event) => setAddress(event.target.value)}
      variant="standard"
      sx={{ color: 'yellow' }}
    />
    <Box sx={{ mt: 1 }}>
      <TextField
        required
        id="gender"
        select
        label="Gender"
        value={gender}
        onChange={(event) => setGender(event.target.value)}
        variant="standard"
        sx={{ width: '200px', color: 'yellow' }}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
    </Box>
    <TextField
      id="picture_url"
      label="Picture URL"
      value={picture_url}
      onChange={(event) => setPictureUrl(event.target.value)}
      variant="standard"
      sx={{ mt: 2}}
      
    />
    <Button 
      type="submit" 
      variant="contained" 
      sx={{ mt: 2, color: 'yellow' }}
    >
      Register
    </Button>
    </Box>
  </form>
  
</Box>









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
