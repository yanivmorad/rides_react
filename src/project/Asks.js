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
import  {useTheme}  from '@mui/material/styles';
import city from "./cities.json"
import "./Offer.css"






import { TypographyRoot } from '@mui/material/Typography/Typography';
import axios from 'axios';
import { RIDE } from './urls';
import logo from './imeges/Asks.png'

export default function Asks(props) {

  const [toLocation, setToLocation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [seats, setSeats] = useState(1);
  const [details, setDetails] = useState("");
  const [loading,setLoding]= useState(false)
  const [error,setError] = useState("none")
  const theme = useTheme();
  const options = city.map((item) => item.name);


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
    <CssBaseline />
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor:"rgb(255, 255, 255)",
          border: `1px solid rgb(244, 67, 54) `,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
       <Avatar
  alt="Remy Sharp"

  src={logo}
  sx={{ width: 100,border: `1px solid rgb(244, 67, 54) `, height: 100 }}/>
         <h5 className='asked' align="center" sx={{marginBottom: '90px'}} gutterBottom>
          בקש טרמפ
        </h5>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
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
           
              <Grid item xs={6}>
                <TextField
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
                />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField dir="rtl"
          sx={{ "& label": { right: 0 }, color: "rgb(244, 67, 54) !important"}} id="details" label="פרטים" variant="filled" multiline maxRows={4} fullWidth
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
        color: "rgb(244, 67, 54)",
        border: `2px solid rgb(244, 67, 54)`,
        width: "120px",
        '&:hover': {
          backgroundColor:"rgb(244, 67, 54)",
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
    </>
  );
}
