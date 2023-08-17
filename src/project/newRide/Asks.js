import { useState,React } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import {  Grid, TextField, InputAdornment, Typography, Alert, Autocomplete, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import  {ThemeProvider, createTheme, useTheme}  from '@mui/material/styles';
import city from "../cities.json"
import "./newRide.css"


import axios from 'axios';
import { RIDE } from '../urls';
import logo from '../imeges/Asks.png'
import { unstable_HistoryRouter } from 'react-router-dom';

export default function Asks(props) {

  const [toLocation, setToLocation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [seats, setSeats] = useState(1);
  const [details, setDetails] = useState("");
  const [loading,setLoding]= useState(false)
  const [error,setError] = useState("none")
  const options = city.map((item) => item.name);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(179, 0, 0)', // Replace with your desired color
      },
    },
  });

  const  submitNewRide = (event)=>{
    event.preventDefault();
    setLoding(true)
  const datetime = date.format('YYYY-MM-DD') + 'T' + time.format('HH:mm:ss') + 'Z';

  const requestBody= {  
    "from_location": fromLocation,
    "to_location": toLocation,
    "datetime": datetime,
    "is_request": true,
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
          minHeight: '100vh',
          backgroundColor:"rgb(255, 255, 255)",
          border: `1px solid rgb(179, 0, 0)`,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
      >
       <Avatar
  alt="Remy Sharp"

  src={logo}
  sx={{ width: 100,border: `1px solid rgb(179, 0, 0) `, height: 100 }}/>
         <h5 className='asked'  >
          בקש טרמפ
        </h5>
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
      color="primary"

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
    <ThemeProvider theme={theme}>
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
      color="primary"

    />
    </ThemeProvider>
  )}
/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>

                <DesktopDatePicker
                  color="primary"
                  label="תאריך"
                  format="DD.MM.YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  
                  }}
                  disablePast
                />
              
                </ThemeProvider>
                <ThemeProvider theme={theme}>

                <DesktopTimePicker
                      color="primary"

                  label="שעה משוערת"
                  ampm={false}
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                /></ThemeProvider>
              </LocalizationProvider>
            </Grid>
           
              <Grid item xs={6}>
              <ThemeProvider theme={theme}>

                <TextField
                      color="primary"

                  id="seats"
                  label="מקומות "
                  variant="standard"
                  fullWidth
                  type="number"
                  max={10}
                  value={seats}
                  onChange={(event) => {
                    setSeats(event.target.value);
                  }}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                /></ThemeProvider>
              </Grid>
            <Grid item xs={12} sm={6}>
            <ThemeProvider theme={theme}>

            <TextField
              dir="rtl"
              sx={{
                "& label": { right: 20 }    }}
             
              id="details"
              label="פרטים"
              variant="filled"
              multiline
              maxRows={4}
              fullWidth
              color="primary"
              onChange={(event) => {
                setDetails(event.target.value);
              }}
            /></ThemeProvider>

            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <LoadingButton
      onClick={submitNewRide}
      endIcon={<SendIcon />}
      loading={loading}
      loadingPosition="end"
      sx={{
        backgroundColor: '#f2f2f2',
        // color: "rgb(244, 67, 54)",
        border: `2px solid `,
        width: "120px",
        '&:hover': {
          backgroundColor:"rgb(179, 0, 0)",
          color: '#fff'
        }
      }}
    >
      <span>בקש </span>
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
