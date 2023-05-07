import { useState,React } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import {  Grid, TextField, InputAdornment, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';



import { TypographyRoot } from '@mui/material/Typography/Typography';
import axios from 'axios';
import { RIDE } from './urls';


export default function Offer(props) {
  const [toLocation, setToLocation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(1);
  const [details, setDetails] = useState("");

  const  submitNewRide = (event)=>{
    event.preventDefault();
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
  })
  .catch((err) =>{ console.log(err)

  })}

return (
    <>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "rgba(97, 31, 97, 0.8)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          צור נסיעה חדשה
        </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                id="to_location"
                label="יעד"
                variant="standard"
                fullWidth
                value={toLocation}
                onChange={(event) => {
                  setToLocation(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="from_location"
                label="מוצא"
                variant="standard"
                fullWidth
                value={fromLocation}
                onChange={(event) => {
                  setFromLocation(event.target.value);
                }}
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
                      style: { textAlign: "left" },
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
              <TextField id="details" label="פרטים" variant="filled" multiline maxRows={4} fullWidth
              onChange={(event) => {
                setDetails(event.target.value);
              }}/>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <LoadingButton
  onClick={submitNewRide}
  endIcon={<SendIcon />}
  loading={false}
  loadingPosition="end"
  variant="contained"
  sx={{
    backgroundColor: "#ffdb4d",
    // "&:hover": {
    //   backgroundColor: "#ffff33", // Change the color on hover if needed
    // }
  }}
>
  <span>צור נסיעה</span>
</LoadingButton>

              {/* <Button
                color="secondary"
                size="large"
                variant="contained"
                sx={{ width: '100%' }}
                onClick={submitNewRide}
              >
                צור נסיעה
              </Button> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
