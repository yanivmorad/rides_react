import { Alert, Box, Container, Typography ,Button} from "@mui/material";
import './Home.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RIDE } from "../urls";
import  {useTheme}  from '@mui/material/styles';
// import Button from '@mui/material-next/Button';


import RideCard from "../RideCard";
import { NavLink } from "react-router-dom";
import RideSearchForm from "../RideSearch";
import RideSearch from "../RideSearch";
export default function Home() {
    const [allRide, setAllRide] = useState("")
    const [filrer, setfilter] = useState("");
    const theme = useTheme();


  const getFilter = nFilter=> {
    setfilter(nFilter);}
    console.log(filrer);
    

 function getAllRide(){
  
    const token = localStorage.getItem('access')
    axios.get(RIDE+filrer, {headers: {Authorization: `Bearer ${token}`}})
    .then((responseData) => {
        setAllRide(responseData.data.results)
        console.log(allRide);
      })
      .catch((error) =>{ 
        console.log(error)
  
      });}
      useEffect(()=>getAllRide(),
      [filrer])
      return (
        <>
<Container maxWidth="sm" sx={{ padding: 0, minHeight: '100vh' }}>
   <Box
    sx={{
      minHeight: "100",
      width:"100",
      
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 4,
    }}
  >
<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 3 }}>
  <NavLink to="/asks" >
    <Button  sx={{ width: "150px", height: "75px", backgroundColor: '#f2f2f2', color: 'rgb(179, 0, 0)', border: '2px solid rgb(179, 0, 0)', borderRadius: '50px', }}>
   
 <p className="take-me"> קחו אותי</p></Button> 
  </NavLink>
  <NavLink to="/Offer" >
    <Button  sx={{ width: "150px", height: "75px", backgroundColor: '#f2f2f2', color: 'rgb(0, 80, 158)', border: `2px solid rgb(0, 80, 158)` ,borderRadius: '50px', }}>
      <p className="ride-with-me"> סעו איתי</p></Button>
  </NavLink>
</Box>
<Box>
 <RideSearch getFilter={getFilter}/>
</Box>

<Box sx={{marginTop:4}}>
    {allRide.length > 0 ? (
      allRide.map((ride) => (
        <Box sx={{ marginBottom: 3 }}>
          <RideCard rideData={ride} />
        </Box>
      ))
    ) : (
<Alert  variant="outlined"  severity="warning">לא נמצאו נסיעות</Alert>
    )} 
    </Box>
  </Box> 
</Container>


        </>
      );
          }