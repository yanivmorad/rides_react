import { useState,React } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import {  Grid, TextField, InputAdornment, Typography, Alert,Autocomplete, Avatar, createTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import city from "../cities.json"
import logo from "../imeges/location_logo.png"
import "./newRide.css"
import  {ThemeProvider, }  from '@mui/material/styles';
import axios from 'axios';
import { RIDE } from '../urls';
import styled from '@emotion/styled';


export default function Offer(props) {
  const [toLocation, setToLocation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(1);
  const [details, setDetails] = useState("");
  const [loading,setLoding]= useState(false)
  const [error,setError] = useState("none")
  const options = city.map((item) => item.name);

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(0, 80, 158)', // Replace with your desired color
      },
    },
  });


  const StyledImage = styled('img')({
    height: '70px',})


  const  submitNewRide = (event)=>{
    event.preventDefault();
    setLoding(true)
  const datetime = date.format('YYYY-MM-DD') + 'T' + time.format('HH:mm:ss') + 'Z';

  const requestBody= {  
    "from_location": fromLocation,
    "to_location": toLocation,
    "datetime": datetime,
    "is_request": false,
    "price": price,
    "details":details,
    "seat":seats,
  }
console.log(requestBody);
const token = localStorage.getItem('access')
axios.post(RIDE, requestBody, {headers: {Authorization: `Bearer ${token}`}})
  .then((res) => {
    console.log("File Upload success");
    window.location.href = "/"

   
  })
  .catch((error) =>{ console.log(error.message)
    setError("block")
    setLoding(false)

  })}

return (
    <>
                <ThemeProvider theme={theme}>

    <CssBaseline />
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor:"rgb(255, 255, 255)",
          border: `1px solid rgb(0, 80, 158) `,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          
        }}
      >
        <Avatar
  alt="Remy Sharp"
  // src={logo}
  sx={{ width: 100,backgroundColor:"rgb(255, 255, 255)",border: `2px solid rgb(0, 80, 158)`, height: 100 }}
>
  <StyledImage src={logo} />
</Avatar>
        <h4 className='new_ride' align="center" sx={{marginBottom: '90px'}} gutterBottom>
          צור נסיעה חדשה
        </h4>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={6}>
            <Autocomplete
  id="controllable-states-demo"
  options={options}
  getOptionLabel={(option) => option}
  onChange={(event, newValue) => {
    setToLocation(newValue);
  }}
  renderOption={(props, option) => (
    <li {...props} style={{direction: "rtl"}}>
      {option}
    </li>
  )}
  renderInput={(params) => (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        style: {direction: "rtl"}
      }}
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
      label="יעד"
      variant="standard"
      sx={{ "& label": { right: 20 } }}
    />
  )}
/>
            </Grid>
            <Grid item xs={6} sm={6}>
            <Autocomplete
  id="controllable-states-demo"
  options={options}
  getOptionLabel={(option) => option}
  onChange={(event, newValue) => {
    setFromLocation(newValue);
  }}
  renderOption={(props, option) => (
    <li {...props} style={{direction: "rtl"}}>
      {option}
    </li>
  )}
  renderInput={(params) => (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        style: {direction: "rtl"}
      }}
      InputLabelProps={{
        style: {direction: "rtl"}
      }}
      label="מוצא"
      variant="standard"
      sx={{ "& label": { right: 20 } }}
    />
  )}
/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="תאריך"
                  value={date}
                  format="DD.MM.YYYY"

                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  disablePast
                />
                <DesktopTimePicker
                  label="שעה משוערת"
                  ampm={false}
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  id="price"
                  label="מחיר"
                  variant="standard"
                  fullWidth
                  type="number"
                  defaultValue={0}
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  InputProps={{
                    inputProps: {
                      pattern: "[0-9]*",
                      inputMode: "numeric",
                       min: 0, 
                       step:10
                     
                    },
                    startAdornment: (
                      <InputAdornment position="start">₪</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="seats"
                  label="מקומות פנויים"
                  variant="standard"
                  fullWidth
                  type="number"
                  max={10}
                  value={seats}
                  onChange={(event) => {
                    setSeats(event.target.value);
                  }}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>

              <TextField id="details"  label="פרטים" variant="filled" multiline maxRows={4} fullWidth dir="rtl"
          sx={{ "& label": { right: 20 } }}
              onChange={(event) => {
                setDetails(event.target.value);
              }}/>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <LoadingButton
  onClick={submitNewRide}
  endIcon={<SendIcon />}
  loading={loading}
  loadingPosition="end"
  sx={{
    backgroundColor: '#f2f2f2',
    color: 'rgb(0, 80, 158)',
    border: '1.5px solid rgb(0, 80, 158)',
    width: "120px",
    '&:hover': {
      backgroundColor: 'rgb(0, 80, 158)',
      color: '#fff'
    }
  }}
>
  <span>צור נסיעה</span>
</LoadingButton>

            </Grid>
            <Alert style={{ display: error }} variant="filled" severity="error">משהו השתבש נסה שוב</Alert>
            
          </Grid>
         

        </Box>
      </Container>
      </ThemeProvider>
    </>
  );
}
