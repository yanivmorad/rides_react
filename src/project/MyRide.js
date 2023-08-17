import { Alert, Avatar, Box, Container, Fade, Tab, Tabs } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { RIDE } from "./urls";
import RideCard from "./RideCard";
import logo from "./imeges/logo.png";
import CardSkeleton from "./CardSkeleton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function MyRide({ me }) {
  const [activeTab, setActiveTab] = useState('activeTrips');
  const [loadingCard, setLoadingCard] = useState(true);
  const [allRide, setAllRide] = useState([]);
  
  const filterRide = [];
  const otherRides = [];
  
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(0, 80, 158)',
      },
      secondary: {
        main: 'rgb(179, 0, 0)',
      },
    },
  });
  
  allRide.forEach((ride) => {
    if (ride.status === 'cancelled') {
      return;
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
      return;
    } else if (rideYear === currentYear && rideMonth < currentMonth) {
      return;
    } else if (rideYear === currentYear && rideMonth === currentMonth && rideDay < currentDay) {
      return;
    }
  
    filterRide.push(ride);
  });
  
  allRide.forEach((ride) => {
    if (!filterRide.includes(ride)) {
      otherRides.push(ride);
    }
  });
  
  function getAllRide() {
    setLoadingCard(true);
    const token = localStorage.getItem('access');
    const queryParams = {
      user: me.id,
    };
  
    axios
      .get(RIDE, { headers: { Authorization: `Bearer ${token}` }, params: queryParams })
      .then((responseData) => {
        const newRides = responseData.data.results;
        console.log(responseData.data);
        setAllRide(newRides);
        setLoadingCard(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  useEffect(() => {
    getAllRide();
  }, []);
  
  const handleTabChange = (Tab) => {
    setActiveTab(Tab);
  };
  
  return (
    <>
      <ThemeProvider theme={theme}>
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
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 100, border: `2px solid rgb(179, 0, 0)`, height: 100 }}
            />
    
            <h4 className='new_ride' align="center" sx={{ marginBottom: '90px' }} gutterBottom>
              הנסיעות שלי
            </h4>
           
            <Box sx={{ marginTop: 2 }}>
              <Tabs
                value={activeTab}
                onChange={(event, newValue) => handleTabChange(newValue)}
                textColor="primary"
                indicatorColor={activeTab === 'allTrips' ? 'secondary' : 'primary'}
                centered
              >
                <Tab
                  label="נסיעות שהסתיימו"
                  value="allTrips"
                  sx={{
                    fontSize: '1.2rem',
                    color: 'rgb(179, 0, 0)',
                    '&.Mui-selected': {
                      color: 'rgb(179, 0, 0)',
                    },
                  }}
                />
                <Tab
                  label="נסיעות פעילות"
                  value="activeTrips"
                  sx={{
                    fontSize: '1.2rem',
                    color: 'rgb(0, 80, 158)',
                    '&.Mui-selected': {
                      color: 'rgb(0, 80, 158)',
                    },
                  }}
                />
              </Tabs>
            </Box>
            {loadingCard ? (
              <Box sx={{ marginTop: 4 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box key={index} sx={{ marginBottom: 3 }}>
                    <CardSkeleton />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ marginTop: 4 }}>
                {activeTab === 'allTrips' && (
                  <Fade in={otherRides.length > 0} timeout={500}>
                    <Box>
                      {otherRides.length > 0 ? (
                        otherRides.map((ride) => (
                          <Box key={ride.id} sx={{ marginBottom: 3 }}>
                            <RideCard rideData={ride} me={me} getAllRide={getAllRide}/>
                          </Box>
                        ))
                      ) : (
                        <Alert variant="outlined" severity="warning">
                          לא נמצאו נסיעות
                        </Alert>
                      )}
                    </Box>
                  </Fade>
                )}
    
                {activeTab === 'activeTrips' && (
                  <Fade in={filterRide.length > 0} timeout={500}>
                    <Box>
                      {filterRide.length > 0 ? (
                        filterRide.map((ride) => (
                          <Box key={ride.id} sx={{ marginBottom: 3 }}>
                            <RideCard rideData={ride} me={me} getAllRide={getAllRide} />
                          </Box>
                        ))
                      ) : (
                        <Alert variant="outlined" severity="warning">
                          לא נמצאו נסיעות
                        </Alert>
                      )}
                    </Box>
                  </Fade>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
