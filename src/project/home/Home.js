import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import RideCard from "../RideCard";
import RideSearch from "../RideSearch";
import CardSkeleton from "../CardSkeleton";
import { RIDE } from "../urls";
import "./Home.css";

export default function Home({ me }) {
  const [allRide, setAllRide] = useState([]);
  const [filter, setFilter] = useState("");
  const [loadingCard, setLoadingCard] = useState(true);

  const filterRide = allRide.filter((ride) => {
    if (ride.status === "cancelled") {
      return false; // Exclude cancelled rides
    }

    const rideDate = new Date(ride.datetime);
    const currentDate = new Date();
    const rideYear = rideDate.getFullYear();
    const rideMonth = rideDate.getMonth();
    const rideDay = rideDate.getDate();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (rideYear < currentYear) {
      return false; // Ride date has already passed
    } else if (rideYear === currentYear && rideMonth < currentMonth) {
      return false; // Ride date has already passed
    } else if (rideYear === currentYear && rideMonth === currentMonth && rideDay < currentDay) {
      return false; // Ride date has already passed
    }

    return true; // Include the ride in the filtered array
  });

  const getFilter = (newFilter) => {
    setFilter(newFilter);
  };

  function getAllRide() {
    setLoadingCard(true);
    const token = localStorage.getItem("access");
    axios
      .get(RIDE + filter, { headers: { Authorization: `Bearer ${token}` } })
      .then((responseData) => {
        setAllRide(responseData.data.results);
        setLoadingCard(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllRide();
  }, [filter]);

  return (
    <>
      <Container maxWidth="sm" sx={{ padding: 1, minHeight: '100vh' }}>
        <Box
          sx={{
            minHeight: "100",
            width: "100",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: [1, 4],
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 3,
              padding: 2,
            }}
          >
            <NavLink to="/asks" style={{ textDecoration: "none", color: "inherit" }}>
              <Button
                sx={{
                  width: "150px",
                  height: "75px",
                  backgroundColor: "#f2f2f2",
                  color: "rgb(179, 0, 0)",
                  border: "2px solid rgb(179, 0, 0)",
                  borderRadius: "50px",
                  "@media (max-width: 600px)": {
                    width: "130px",
                    height: "65px",
                  },
                }}
              >
                <p className="take-me"> קחו אותי</p>
              </Button>
            </NavLink>
            <NavLink to="/Offer" style={{ textDecoration: "none", color: "inherit" }}>
              <Button
                sx={{
                  width: "150px",
                  height: "75px",
                  backgroundColor: "#f2f2f2",
                  color: "rgb(0, 80, 158)",
                  border: "2px solid rgb(0, 80, 158)",
                  borderRadius: "50px",
                  "@media (max-width: 600px)": {
                    width: "130px",
                    height: "65px",
                  },
                }}
              >
                <p className="ride-with-me"> סעו איתי</p>
              </Button>
            </NavLink>
          </Box>
          <Box>
            <RideSearch getFilter={getFilter} />
          </Box>

          {loadingCard ? (
            <Box sx={{ marginTop: 4 }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Box sx={{ marginBottom: 3 }}>
                  <CardSkeleton key={index} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ marginTop: 4 }}>
              {filterRide.length > 0 ? (
                filterRide.map((ride) => (
                  <Box sx={{ marginBottom: 3, justifyContent: "center", alignItems: "center" }}>
                    <RideCard rideData={ride} me={me} getAllRide={getAllRide} setLoadingCard={setLoadingCard} />
                  </Box>
                ))
              ) : (
                <Alert variant="outlined" severity="warning">
                  לא נמצאו נסיעות
                </Alert>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
