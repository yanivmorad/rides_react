import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {  SEND_FRIEND_REQUEST } from "./urls";
import axios from "axios";
import { useState } from "react";
import MutualFriends from "./MutualFriends";

export default function RideDetails() {
  const location = useLocation();
  const [friendText, setFriendText] = useState("");
  const { rideAndUserData } = location.state;
  const userID = rideAndUserData.rideData.user
  const address = rideAndUserData.address;
  const name = rideAndUserData.first_name + " " + rideAndUserData.last_name;
  const gender = rideAndUserData.gender;
  const phone_number = rideAndUserData.phone_number;
  const picture_url = rideAndUserData.picture_url;
  const dateString = rideAndUserData.rideData.datetime;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('he-IL');
  const formattedTime = date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
  const rideDetails = rideAndUserData.rideData.details;
  const from_location = rideAndUserData.rideData.from_location;
  const to_location = rideAndUserData.rideData.to_location;
  const is_request = rideAndUserData.rideData.is_request;
  const price = rideAndUserData.rideData.price;
  const seat = rideAndUserData.rideData.seat;
  const token = localStorage.getItem('access')
  let textFriendRequest

  const sendFriendRequest =()=>{axios.post(SEND_FRIEND_REQUEST,{"to_user":userID}, {headers: {Authorization: `Bearer ${token}`}}) 

  .then((responseData) => {
    console.log(responseData);
    setFriendText("הבקשה נשלחה בהצלחה ");

    
  })
  .catch((error) =>{ 
    console.log(error)
    setFriendText("הבקשה לא נשלחה");

  
  })}
let rideTitle
let driverTitle
let color
  if (is_request){
    rideTitle="מחפש טרמפ"
    driverTitle ="פרטי הנוסע"
    color = "rgb(244, 67, 54)"

 }
else {rideTitle="נוסע"
driverTitle ="פרטי הנהג"
color='rgb(0, 80, 158)'}
// primery.main =rgb(25, 118, 210)

  return (
    <Container sx={{
      display: 'flex',
      flexDirection:  'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
     gap: 1,
    }}>
    <Container sx={{
      display: 'flex',
      flexDirection:  'row',
      alignItems: 'stretch',
      justifyContent: 'center',
      height: 'auto',
      gap: [1,4],
    }}>
      <Box sx={{
        width: [200, 200],
        backgroundColor:"rgb(255, 255, 255)",
        border: `1px solid ${color} `,
        alignSelf: 'flex-start',
        direction: 'rtl',
        padding: [1,4],
        borderRadius: 4,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginTop: '8px'
      }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center",color:color }}>
            {rideTitle}      
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.0rem', mb:1}}>
            <strong>מוצא:</strong> {from_location}
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.0rem', mb: 2 }}>
            <strong>יעד:</strong> {to_location}
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.0rem', mb: 2 }}>
            <strong>תאריך:</strong> {formattedDate}
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.0rem', mb: 2 }}>
            <strong>שעה משוערת:</strong> {formattedTime}
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.0rem', mb: 2 }}>
            <strong>מספר מקומות:</strong> {seat}
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.0rem', mb: 2 }}>
            <strong>פרטים:</strong> {rideDetails}
          </Typography>
      
          <Typography dir="rtl" sx={{ fontSize: '1.2rem', mb: 2 ,display: is_request ? 'none' : 'block' }}>
            <strong>מחיר:  </strong>{(price === "0.00") ? "חינם "  : `₪${price}`}
          </Typography>
        </Box>
      
        <Box sx={{
          width: [200, 200],

          backgroundColor:"rgb(255, 255, 255)",
          border: `1px solid ${color} `,
          alignSelf: 'flex-start',
          direction: 'rtl',
          padding: 2,
          borderRadius: 4,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          marginTop: '8px'

        }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" ,color:color}}>
            {driverTitle}
          </Typography>
      
          <Avatar alt={name} src={picture_url} sx={{ width: 120, height: 120, mx: "auto", mb: 1 }} />
      
          <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
            <strong>שם:</strong> {name}
          </Typography>
      
          <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
            <strong>מין:</strong> {gender}
          </Typography>
      
          <Typography sx={{ fontSize: '1.2rem', mb: 1 }}>
            <strong>טלפון:</strong> {phone_number}
          </Typography>
          <Typography sx={{ fontSize: '1.2rem', mb: 1 }}>
        <strong>כתובת:</strong> {address}
    </Typography>
   
    <Button onClick={sendFriendRequest}  variant="outlined" sx={{
   
    color: color,
    border: `1px solid ${color}`,
   
    '&:hover': {
      border: `1px solid ${color}`,
      color: color,
      
    }
  }}
  > <Typography sx={{ fontSize: '1.0rem', }}>שלח בקשת חברות</Typography></Button>
    {friendText && <Typography>{friendText}</Typography>}
    </Box> 
   
</Container>
<Box sx={{
  flex: 0.5,
  backgroundColor: "rgb(255, 255, 255)",
  border: `1px solid ${color}`,
  alignSelf: "flex-start",
  direction: "rtl",
  padding: 2,
  borderRadius: 4,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  marginTop: '8px',
  marginLeft: "auto",
  marginRight: "auto"
}}>
  {/* New content for third box */}
  <Typography variant="h5" sx={{ mb: 2, textAlign: "center", color: color }}>
    חברים משותפים
  </Typography>

  <MutualFriends userID={userID}/>
</Box>
      </Container>

)}