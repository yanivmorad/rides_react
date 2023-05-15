import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Switch, FormControlLabel, Autocomplete } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Grid } from "@mui/material";
import city from "./cities.json"



export default function  RideSearch({getFilter}) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState(dayjs());
  const [isRequest, setIsRequest] = useState(false);
  const [price, setPrice] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let filters = `?datetime=${date.toISOString().slice(0, 10)}&`;
    if (fromLocation !== '') filters += `from_location=${fromLocation}&`;
    if (toLocation !== '') filters += `to_location=${toLocation}&`;
    if (toLocation !== '') filters += `to_location=${toLocation}&`;
    if (price === true) filters += `price=0&`
    if (isRequest){filters+=`is_request=True&`}
    else{filters+=`is_request=False`}
    
    getFilter(filters)
   
  };
  const options = city.map((item) => item.name);

  return (
        
    <Grid container spacing={2} alignItems="center" justifyContent="center" >
     <Grid item xs={6} md={6} dir="rtl">
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
      <Grid  item xs={6} md={6}>
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
      <Grid item xs={7} md={6} justifyContent="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="תאריך"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);}}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={9} md={6}>
        <FormControlLabel
          control={
            <Switch
              checked={isRequest}
              onChange={(event) => setIsRequest(event.target.checked)}
            />
          }
          label="חפש נוסע"
        />
        <FormControlLabel
          control={
            <Switch
              checked={price}
              onChange={(event) => setPrice(event.target.checked)}
            />
          }
          label="חינם"
        />
      </Grid>
      <Grid item container justifyContent="center">
        <Button onClick={handleSubmit} variant="contained" sx={{ mr: 2 }}>
          חפש
        </Button>
        <Button color="error"  onClick={()=>getFilter("")} variant="contained">
          בטל
        </Button>
      </Grid>
    </Grid>
    
  );
}
