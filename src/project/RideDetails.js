import { Alert, Avatar, Box, Button, Container, Tooltip, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {  FRIENDS, SEND_FRIEND_REQUEST } from "./urls";
import axios from "axios";
import { useEffect, useState } from "react";
import MutualFriends from "./MutualFriends";
import whatsapp from "./imeges/Digital_Glyph_Black.png"
import "./style.css"

export default function RideDetails({me}) {
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
  const formattedTime = date.toISOString().substring(11, 16);
  const rideDetails = rideAndUserData.rideData.details;
  const from_location = rideAndUserData.rideData.from_location;
  const to_location = rideAndUserData.rideData.to_location;
  const is_request = rideAndUserData.rideData.is_request;
  const price = rideAndUserData.rideData.price;
  const seat = rideAndUserData.rideData.seat;
  const token = localStorage.getItem('access')
  const [allFriends,setAllFriends] =useState([])
  const getFriends =()=>{axios.get(FRIENDS, {headers: {Authorization: `Bearer ${token}`}})
  .then((responseData) => {
    setAllFriends(responseData.data)}
    
    )}
    useEffect(() => {
      getFriends()
    }, [])
const userExists = allFriends.some(friend => friend.id === userID);
const isCurrentUser = me.id === userID;
const friendButton = userExists || isCurrentUser;
const friend = userExists
  
  const sendFriendRequest =()=>{axios.post(SEND_FRIEND_REQUEST,{"to_user":userID}, {headers: {Authorization: `Bearer ${token}`}}) 

  .then((responseData) => {
    console.log(responseData);
    setFriendText("הבקשה נשלחה בהצלחה ");
})
  .catch((error) =>{ 
    console.log(error)
    setFriendText("הבקשה לא נשלחה");
})}
let same_user
if(me.id===userID){
  // setFriendButton(true)
  same_user = true
}
else{same_user=false}
let titelClassName
let rideTitle
let driverTitle
let color
  if (is_request){
    rideTitle="מחפש טרמפ"
    driverTitle ="פרטי הנוסע"
    color = "rgb(179,0,0)"
    titelClassName="reqest"

 }
else {rideTitle="נוסע"
driverTitle ="פרטי הנהג"
titelClassName="driver"
color='rgb(0, 80, 158)'}
// primery.main =rgb(25, 118, 210)




  return (
    <Container sx={{
      display: 'flex',
      flexDirection:  'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
     gap: 2,
    }}>
    <Container sx={{
      
       display: 'flex',
       flexDirection: 'row',
       alignItems: 'stretch', 
       justifyContent: 'center',
       height: 'auto',
      gap: [1,4],
      paddingLeft: 0,  // Adjust the value to set the desired left padding on different devices
      paddingRight: 0 
    }}>
      <Box // Ride box 
      sx={{
        
        width: [175, 200],
        backgroundColor:"rgb(255, 255, 255)",
        border: `1px solid ${color} `,
        direction: 'rtl',
        padding: 2,
        borderRadius: 4,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginTop: '8px'
      }}>
          <p className={titelClassName}> {rideTitle}</p>
      
      <p className="rideDetails">
      <strong>מוצא:</strong> {from_location}
    </p>

    <p className="rideDetails">
      <strong>יעד:</strong> {to_location}
    </p>

    <p className="rideDetails">
      <strong>תאריך:</strong> {formattedDate}
    </p>

    <p className="rideDetails">
      <strong>שעה משוערת:</strong> {formattedTime}
    </p>

    <p className="rideDetails">
      <strong>מספר מקומות:</strong> {seat}
    </p>

    <p className="rideDetails" style={{ display: is_request ? 'none' : 'block' }}>
      <strong>מחיר: </strong>{price === "0.00" ? "חינם" : `₪${price}`}
    </p>

    <p className="rideDetails">
      <strong>פרטים:</strong> {rideDetails}
    </p>

   

        </Box>
      
        <Box
  sx={{
    width: [175, 200],
    backgroundColor: "rgb(255, 255, 255)",
    border: `1px solid ${color}`,
    direction: 'rtl',
    padding: 2,
    borderRadius: 4,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginTop: '8px'
  }}
>
<p className={titelClassName}>{driverTitle}</p>    
  

  <Avatar alt={name} src={picture_url} sx={{ width: 120, height: 120, mx: "auto", mb: 1 }} />

  <p className="userDetails">
  <strong>שם:</strong> {name}
</p>

<p className="userDetails">
  <strong>מין:</strong> {gender === 'male' ? 'זכר' : gender === 'female' ? 'נקבה' : 'אחר'}
</p>

{phone_number ? (
  <>
    <p className="userDetails">
      <strong>טלפון:</strong>{phone_number}
    </p>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
      <a href={`https://wa.me/${phone_number.substring(1).replace('-', '')}`}>
        <Tooltip title="שלחו ווצאפ">
          <img
            src={whatsapp}
            alt="WhatsApp"
            style={{ width: '20px', height: '20px' }}
          />
        </Tooltip>
      </a>
    </div>
  </>
) : null}

<p className="userDetails">
  <strong>כתובת:</strong> {address}
</p>


  {friend ? <Alert severity="success" sx={{ fontSize: '1.0rem', textAlign: "center" }}>חברים</Alert> : null}
  {friendButton ? null : (
    <Button onClick={sendFriendRequest} variant="outlined" sx={{
      color: color,
      border: `1px solid ${color}`,
      '&:hover': {
        border: `1px solid ${color}`,
        color: color,
      }
    }}
    >
      <Typography sx={{ fontSize: '1.0rem', }}>שלח בקשת חברות</Typography>
    </Button>
  )}
  {friendText && <Typography>{friendText}</Typography>}
</Box>

   
</Container>
{isCurrentUser? null:(<Box sx={{
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
  <p className={titelClassName}>    חברים משותפים
 </p>
  

  <MutualFriends userID={userID}/>
</Box>)}
      </Container>

)}