import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RIDE } from "./urls";

import RideCard from "./RideCard";

export default function Home() {
    const [allRide, setAllRide] = useState("")

 function getAllRide(){
    const token = localStorage.getItem('access')
    axios.get(RIDE, {headers: {Authorization: `Bearer ${token}`}})
    .then((responseData) => {
        console.log(responseData);
        setAllRide(responseData.data.results)
        console.log(allRide);
      })
      .catch((error) =>{ 
        console.log(error)
  
      });}
      useEffect(()=>getAllRide(),
      [])
      return (
        <>
    <Container maxWidth="sm">
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 4,
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 4 }}>
  <Button variant="contained" sx={{ width: "150px", height: "100px", backgroundColor: "#ffdb4d" }}>מבקש</Button> 
  <Button variant="contained" sx={{ width: "150px", height: "100px", backgroundColor: "#611f61" }}>מציע</Button>
</Box>


    {allRide.length > 0 ? (
      allRide.map((ride) => (
        <Box sx={{ marginBottom: 4 }}>
          <RideCard rideData={ride} />
        </Box>
      ))
    ) : (
      <Typography>No rides found</Typography>
    )}
  </Box>
</Container>


        </>
      );
          }