import { useEffect, useState } from "react";
import axios from "axios";
import { FRIENDS, SEARCH_USERS, SEND_FRIEND_REQUEST } from "../urls";
import { Avatar, Box, Chip, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import FriendRequestListItem from "./FriendRequestListItem";
import FriendRequestDialog from "./FriendRequestDialog";
import "./friendPageStyle.css"
import TaskAltIcon from '@mui/icons-material/TaskAlt';



export default function SearchUsers() {
    const [searchResults, setSearchResults] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem('access');
    const [sentFriendRequests, setSentFriendRequests] = useState([]); // New state variable

  
    const [allFriends, setAllFriends] = useState([]);
  
    useEffect(() => {
      getFriends();
    }, []);
  
    const getFriends = () => {
      axios.get(FRIENDS, { headers: { Authorization: `Bearer ${token}` } })
        .then((responseData) => {
          setAllFriends(responseData.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const isFriend = (userID) => {
      return allFriends.some((friend) => friend.id === userID);
    };
  
    const sendFriendRequest = (userID) => {
      axios.post(SEND_FRIEND_REQUEST, { "to_user": userID }, { headers: { Authorization: `Bearer ${token}` } })
        .then((responseData) => {
          console.log(responseData);
          setSentFriendRequests([...sentFriendRequests, userID]); // Add the user's ID to the sentFriendRequests array

        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const searchUsers = (event) => {
      const name = event.target.value;
      if (name === "") {
        setSearchResults([]);
        return;
      }
      axios
        .get(SEARCH_USERS + name)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleListItemClick = (user) => {
      setSelectedUser(user);
      setDialogOpen(true);
    };
  
    return (
      <>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            padding: 2
          }}
        >
          <p className="searchUserTitel">חפש חברים</p>
          <Box
            sx={{
              display: "flex",
              marginBottom: 3,
              width: 250
            }}
          >
            <TextField
              fullWidth
              InputProps={{
                style: {direction: "rtl"}
              }}
              InputLabelProps={{
                style: { direction: "rtl" }
              }}
              label="חפש"
              variant="standard"
              color="primary"
              sx={{ "& label": { right: 20 } }}
              onChange={searchUsers}
            />
          </Box>
  
          <Box
            sx={{
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            {searchResults.length === 0 ? null :
              <List dense sx={{ width: 360, bgcolor: "background.paper", direction: 'rtl' }}>
                {searchResults.map((searchResult) => (
                  <ListItem disablePadding key={searchResult.id}>
                    <ListItemButton onClick={() => handleListItemClick(searchResult)}>
                      <ListItemAvatar>
                        <Avatar src={searchResult.picture_url} />
                      </ListItemAvatar>
                      <ListItemText primary={`${searchResult.first_name} ${searchResult.last_name}`} sx={{ textAlign: 'right' }} />
                      {isFriend(searchResult.id) ? (
    <TaskAltIcon sx={{ color: 'success.main', fontSize: '30px', marginLeft: '30px' }} />
  ) : sentFriendRequests.includes(searchResult.id) ? (
    <Chip
      label="בקשת חברות נשלחה"
      variant="outlined"
      color="primary"
      size="small"
      sx={{ marginLeft: 1 }}
      disabled
    />
  ) : (
    <Chip
      label="שלח בקשה"
      variant="outlined"
      color="primary"
      size="small"
      sx={{ marginLeft: 1 }}
      onClick={(event) => {
        event.stopPropagation();
        sendFriendRequest(searchResult.id);
      }}
    />
  )}
  
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>}
          </Box>
          <FriendRequestDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            userData={selectedUser}
            friendRequest={selectedUser}
          />
        </Box>
      </>
    );
  }
  