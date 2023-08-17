import { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Autocomplete, Box,  Switch } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Grid } from "@mui/material";
import city from "./cities.json"





export default function  RideSearch({getFilter}) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState(dayjs());
  const [isDriver, setIsDriver] = useState(false);
  const [isPassenger, setIsPassenger] = useState(false);
  const [price, setPrice] = useState(false);



const handleSubmit = (event) => {
  console.log("start s");
  event.preventDefault();
  let filters = `?datetime=${date.toISOString().slice(0, 10)}&`;
  if (fromLocation !== '') filters += `from_location=${fromLocation}&`;
  if (toLocation !== '') filters += `to_location=${toLocation}&`;
  if (price === true) filters += `price=0&`
  if (isDriver) filters += `is_request=False&`;
  if (isPassenger) filters += `is_request=True&`;
  getFilter(filters)
  console.log(filters);
};

const handleCancel = () => {
  setMounted(false);
  setFromLocation('');
  setToLocation('');
  setDate(dayjs());
  setIsDriver(false);
  setIsPassenger(false);
  setPrice(false);
  getFilter(''); 
};

const options = city.map((item) => item.name);

const [mounted, setMounted] = useState(false);

useEffect(() => {
  // Set mounted to true when the component mounts
  setMounted(true);
}, [fromLocation, toLocation, date, isDriver, price, isPassenger]);

useEffect(() => {
  if (mounted && (fromLocation || toLocation || date || isDriver || price || isPassenger)) {
    console.log("run");
    let filters = `?datetime=${date.toISOString().slice(0, 10)}&`;
    if (fromLocation !== '') filters += `from_location=${fromLocation}&`;
    if (toLocation !== '') filters += `to_location=${toLocation}&`;
    if (price === true) filters += `price=0&`;
    if (isDriver) filters += `is_request=False&`;
    if (isPassenger) filters += `is_request=True&`;

    const constructedFilters = filters;
    getFilter(constructedFilters);
  }
}, [fromLocation, toLocation, date, isDriver, price, isPassenger]);

  return (
        <Box>
          <p className='driver'> חפש נסיעה</p>
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
          <li {...props} style={{ direction: 'rtl' }}>
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              style: { direction: 'rtl' },
            }}
            InputLabelProps={{
              style: { direction: 'rtl' },
            }}
            label="יעד"
            placeholder="הזן יעד"
            variant="standard"
      sx={{ "& label": { right: 50 } }}
          />
        )}
        value={toLocation} 
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
          <li {...props} style={{ direction: 'rtl' }}>
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              style: { direction: 'rtl' },
            }}
            InputLabelProps={{
              style: { direction: 'rtl' },
            }}
              label="מוצא"
              placeholder="הזן מוצא"
              variant="standard"
      sx={{ "& label": { right: 50 } }}
          />
        )}
        value={fromLocation} 
      />
        
      </Grid>
      <Grid item xs={7} md={6} justifyContent="center">
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
</LocalizationProvider>
      </Grid>
      <Grid item xs={9} md={6}>
  <Grid container spacing={2} direction="row" justifyContent="center">
    <Grid item xs={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isDriver}
            onChange={(event) => {
              setIsDriver(event.target.checked);
              setIsPassenger(false); // Uncheck the passenger option
            }}
            sx={{
              '&.Mui-checked': {
                color: 'rgb(0, 80, 158)',
              },
            }}
          />
        }
        labelPlacement="top"
        label="נהג"
      />
    </Grid>
    <Grid item xs={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isPassenger}
            onChange={(event) => {
              setIsPassenger(event.target.checked);
              setIsDriver(false); // Uncheck the driver option
            }}
            sx={{
              '&.Mui-checked': {
                color: "rgb(179, 0, 0)",
              },
            }}
          />
        }
        labelPlacement="top"
        label="נוסע"
      />
    </Grid>
    <Grid item xs={4}>
      <FormControlLabel
        control={
          <Switch
            checked={price}
            onChange={(event) => setPrice(event.target.checked)}
          />
        }
        labelPlacement="top"
        label="חינם"
      />
    </Grid>
  </Grid>
</Grid>


      <Grid item container justifyContent="center">
        {/* <Button onClick={handleSubmit} variant="contained" sx={{ mr: 2 }}>
          חפש
        </Button> */}
        <Button color="error"  onClick={handleCancel} variant="contained">
          בטל
        </Button>
      </Grid>
    </Grid>
    </Box>
  );
}
