import { Card, CardContent, CardMedia, Typography, Box, Grid, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import leftArrow from "./imeges/left_arrow.png"
import test_imge from './imeges/blank-profile-picture.png.webp'
import axios from 'axios';
import { GET_USER } from './urls';
import { useEffect, useState } from 'react';
import  LocationLogo from "./imeges/location_logo.png";
import asksLogo from "./imeges/Asks.png"
import logo from "./imeges/logo.png"
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export default function RideCard(props) {
    const rideId = props.rideData.id;
    const userId = props.rideData.user;
    const from_location =props.rideData.from_location
    const to_location = props.rideData.to_location
    const price = props.rideData.price
    const datetime = props.rideData.datetime
    let date = (new Date(datetime)).toLocaleDateString('he-IL')
    const is_request = props.rideData.is_request
    const [user, setUser] = useState({});
  
const today = new Date();
const rideDate = new Date(datetime); //Sat Apr 15 2023 15:00:00 GMT+0300 (שעון ישראל (קיץ))

// Compare the two dates
if (today.toDateString() === rideDate.toDateString()) {
  
  date = "היום";
} 
else if (rideDate.getDate() === today.getDate() + 1) {
  date = "מחר";}

  const token = localStorage.getItem('access')
  const userDetails = ()=>{ axios.get(GET_USER+userId+"/", {headers: {Authorization: `Bearer ${token}`}}) 

  .then((responseData) => {
    setUser(responseData.data)
  //  console.log(responseData);
  
    ;
  })
  .catch((error) =>{ 
    console.log(error)
  
  })}
 
useEffect(() => {
  userDetails()
}, [])
const StyledLogo = styled('img')({
  height: '50px', // default height
  filter: 'hue-rotate(1deg)',
  '@media (max-width: 600px)': { // apply styles for screen widths up to 600px
    height: '40px',marginRight:'5px'
  },
});
let profileImeg
let username =user.first_name+" "+user.last_name
 if(user.picture_url){
  profileImeg = user.picture_url
 }
 else{profileImeg=test_imge}
 const StyledImg = styled('img')({
  height: '50px',
  fontSize: '2rem',
  '@media (max-width: 600px)': {
    height: '20px',
    fontSize: '1.5rem'
  },
});

let StyledImage = styled('img')({
  height: '100px', // default height
  '@media (max-width: 600px)': { // apply styles for screen widths up to 600px
    height: '30px',
  },
});
let cardColor;
let logoPerRide 
if (is_request){
  cardColor = "rgb(179, 0, 0,0.4)";
 StyledImage = styled('img')({
    height: '100px', // default height
    '@media (max-width: 600px)': { // apply styles for screen widths up to 600px
      height: '80px',
    },
  });
  logoPerRide = { src: asksLogo, };
}
else {
  cardColor = "primary.main";
  logoPerRide = { src: LocationLogo, };
  StyledImage = styled('img')({
    height: '30px', // default height
    '@media (max-width: 600px)': { // apply styles for screen widths up to 600px
      height: '27px',
    },
  });
}

const rideAndUserData = {
  ...user,
  rideData:props.rideData
};
// console.log(rideAndUserData);



return(
<Link to= {`/ride/${rideId}`} state= {{rideAndUserData: rideAndUserData}}style={{ textDecoration: 'none'}}>
<Card sx={{
  width: "100%",
  height: 150,
  backgroundColor: cardColor,
  borderRadius: '16px',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
  
}}>
  <Grid container justifyContent="space-between" alignItems="center" height="100%">
    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
    <StyledImage {...logoPerRide} />

    </Grid>

    <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Typography dir="rtl" variant="" color="text.secondary" sx={{ fontSize: '1.3rem', ml: 1, '@media (max-width: 600px)': { fontSize: '1rem' } }}>
    <Box component="span" sx={{ fontWeight: 'bold' }}>
      {to_location}
    </Box>
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
    <StyledImg src={leftArrow} />
  </Box>
  <Typography dir="rtl" variant="body2" color="text.secondary" sx={{ fontSize: '1.3rem', mr: 1, '@media (max-width: 600px)': { fontSize: '1rem' ,marginRight:"1px" } }}>
    {from_location}
  </Typography>
  <StyledLogo src={logo} />
</Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Typography variant="h6" color="" sx={{ '@media (max-width: 600px)': { fontSize: '1rem' } }}>
          {date}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      <Avatar
        sx={{ width: 80, height: 80, '@media (max-width: 600px)': { width: 60, height: 60 } }}
        src={profileImeg}
        alt="profile picture"
      />
      <Typography dir="rtl" sx={{ maxWidth: '100%', textOverflow: 'ellipsis', fontSize: '1.2rem',marginRight:"6px", '@media (max-width: 600px)': { fontSize: '1rem' } }}>
        {username.length > 10 ? <span style={{ fontSize: '1rem' }}>{username}</span> : username}
      </Typography>
    </Grid>
 </Grid>
</Card>
</Link>








)}