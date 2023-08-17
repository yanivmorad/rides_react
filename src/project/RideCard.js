import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Avatar,
  Badge,
  createTheme,
  Alert,
} from '@mui/material';
import styled from '@emotion/styled';
import AccessTime from '@mui/icons-material/AccessTime';
import EventSeat from '@mui/icons-material/EventSeat';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import PeopleIcon from '@mui/icons-material/People';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ThemeProvider } from '@mui/material/styles';

import leftArrow from './imeges/left_arrow.png';
import test_imge from './imeges/blank-profile-picture.png.webp';
import LocationLogo from './imeges/location_logo.png';
import asksLogo from './imeges/Asks.png';
import logo from './imeges/logo.png';

import { FRIENDS, GET_USER, MUYUAL_FRIENDS, RIDE } from './urls';

export default function RideCard({ rideData, me, getAllRide, setLoadingCard }) {
  const rideId = rideData.id;
  const userId = rideData.user;
  const from_location = rideData.from_location;
  const to_location = rideData.to_location;
  const price = rideData.price;
  const seat = rideData.seat;
  const datetime = rideData.datetime;
  const time = new Date(datetime).toISOString().substring(11, 16);
  let date = new Date(datetime).toLocaleDateString('he-IL');
  const is_request = rideData.is_request;
  const isCurrentUser = me.id === userId;
  const token = localStorage.getItem('access');

  const [user, setUser] = useState({});
  const [mutualList, setMutualList] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

  const getFriends = () => {
    axios.get(FRIENDS, { headers: { Authorization: `Bearer ${token}` } })
      .then((responseData) => {
        setAllFriends(responseData.data);
      });
  };

  const friend = allFriends.some((friend) => friend.id === userId);

  const today = new Date();
  const rideDate = new Date(datetime);

  if (today.toDateString() === rideDate.toDateString()) {
    date = 'היום';
  } else if (rideDate.getDate() === today.getDate() + 1) {
    date = 'מחר';
  }

  const deleteRide = () => {
    axios.patch(
      RIDE + rideId + '/',
      { status: 'cancelled' },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        getAllRide();
      })
      .catch((error) => {
        // Handle error
      });
  };

  const userDetails = () => {
    axios.get(GET_USER + userId + '/', { headers: { Authorization: `Bearer ${token}` } })
      .then((responseData) => {
        setUser(responseData.data);
        axios.get(MUYUAL_FRIENDS + `${userId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setMutualList(response.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userDetails();
    getFriends();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(0, 80, 158)',
      },
      secondary: {
        main: is_request ? 'rgb(179, 0, 0)' : 'rgb(0, 80, 158)',
      },
    },
  });

  let profileImeg;
  let username = user.first_name + ' ' + user.last_name;

  if (user.picture_url) {
    profileImeg = user.picture_url;
  } else {
    profileImeg = test_imge;
  }

  const StyledImg = styled('img')({
    height: '50px',
    fontSize: '2rem',
    '@media (max-width: 600px)': {
      height: '20px',
      fontSize: '1.5rem',
    },
  });

  let StyledImage = styled('img')({
    height: '100px', // default height
    '@media (max-width: 600px)': {
      height: '30px',
    },
  });

  let cardColor;
  let logoPerRide;

  if (is_request) {
    cardColor = 'rgb(179, 0, 0)';
    StyledImage = styled('img')({
      height: '100px', // default height
      '@media (max-width: 600px)': {
        height: '80px',
      },
    });
    logoPerRide = { src: asksLogo };
  } else {
    cardColor = 'rgb(0, 80, 158)';
    logoPerRide = { src: LocationLogo };
    StyledImage = styled('img')({
      height: '30px', // default height
      '@media (max-width: 600px)': {
        height: '27px',
      },
    });
  }

  const rideAndUserData = {
    ...user,
    rideData: rideData,
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Link to={`/ride/${rideId}`} state={{ rideAndUserData: rideAndUserData }} style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              width: '100%',
              minWidth: [300, 400],
              height: '100%',
              marginLeft: 1,
              backgroundColor: '#f2f2f2',
              border: `2px solid ${cardColor}`,
              borderRadius: '16px',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Grid container dir="rtl" direction="column">
              <Grid item xs={8}>
                <Grid container direction="row">
                  <Grid item xs={10} direction="row">
                    <Grid container direction="column">
                      <Grid
                        item
                        alignItems="center"
                        direction="row"
                        display="flex"
                        justifyContent="space-around"
                        marginTop={'1rem'}
                        marginBottom={'1rem'}
                      >
                        <p className="cardFromLocation">{from_location}</p>
                        <StyledImg src={leftArrow} />
                        <p className="cardToLocation">{to_location}</p>
                      </Grid>
                      <Grid
                        item
                        alignItems="center"
                        direction="row"
                        display="flex"
                        marginTop={'-1rem'}
                        justifyContent={{
                          xs: 'space-between',
                          sm: 'space-around',
                        }}
                      >
                        <Box direction="row" display="flex" style={{ marginRight: '10px' }}>
                          <p>{date}</p>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <AccessTime />
                          <p>{time}</p>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <EventSeat style={{ marginRight: '5px' }} />
                          <p>{seat}</p>
                        </Box>
                        {is_request ? null : (
                          <Box>
                            <p>{price === '0.00' ? 'חינם' : `₪${price}`}</p>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
                    <StyledImage {...logoPerRide} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                direction="row"
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                backgroundColor={is_request ? 'rgb(179, 0, 0,0.05)' : 'rgb(0, 80, 158,0.07)'}
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={profileImeg}
                    alt="profile picture"
                    sx={{
                      width: 80,
                      height: 80,
                      '@media (max-width: 600px)': { width: 60, height: 60 },
                      marginLeft: '10px',
                      marginRight: '2px',
                    }}
                  />
                  <p variant="body2" className="cardName" sx={{ marginLeft: '10px' }}>
                    {username}
                  </p>
                </Box>
                {isCurrentUser ? (
                  <Tooltip
                    title="הסר"
                  >
                    <DeleteOutlinedIcon
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        deleteRide();
                      }}
                      sx={{ fontSize: '30px', marginLeft: '30px' }}
                    />
                  </Tooltip>
                ) : friend ? (
                  <TaskAltIcon sx={{ color: 'success.main', fontSize: '30px', marginLeft: '30px' }} />
                ) : (
                  <Box>
                    {mutualList.length > 0 ? (
                      <Badge badgeContent={mutualList.length} color="secondary" sx={{ marginLeft: '30px' }}>
                        <PeopleIcon />
                      </Badge>
                    ) : (
                      <>
                        <Avatar sx={{ backgroundColor: '#6a6a6a', marginRight: '25px' }}>
                          <PersonOutlineIcon sx={{ color: '#fff' }} />
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6a6a6a' }}>
                          אין חברים משותפים
                        </Typography>
                      </>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Card>
        </Link>
      </ThemeProvider>
    </>
  );
}
