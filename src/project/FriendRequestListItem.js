import {List,ListItem,ListItemAvatar,ListItemText,ListItemButton, Chip,Avatar} from "@mui/material";
import axios from "axios";
import { FRIEND_REQUEST_CANCEL, FRIEND_REQUEST_CONFIRM, GET_USER } from "./urls";
import { useEffect, useState } from "react";
import FriendRequestDialog from "./FriendsPage";

export default function FriendRequestListItem({ friendRequest, onClick,onRefresh  }) {
  const token = localStorage.getItem("access");
  const [userData, setUserData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const confirmChip = (e) => {
    e.stopPropagation(); // stop the event from propagating to the parent element
    axios.post(FRIEND_REQUEST_CONFIRM + friendRequest.id + "/", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((responseUserData) => {
      console.log(responseUserData.data);
      onRefresh()
     
    })
    .catch((error) => {
      console.log(error);
      
    });
  
  };
  const cancelChip = (e) => {
    e.stopPropagation(); // stop the event from propagating to the parent element
    axios.post(FRIEND_REQUEST_CANCEL + friendRequest.id + "/", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((responseUserData) => {
      console.log(responseUserData.data);
      onRefresh()
    })
    .catch((error) => {
      console.log(error);
    });
  };



  const userDetails = () => {
    axios.get(GET_USER + friendRequest.from_user + "/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((responseUserData) => {
        // console.log(responseUserData.data);
        setUserData(responseUserData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={onClick}>
          <ListItemAvatar>
            <Avatar
              src={userData.picture_url}
            />
          </ListItemAvatar>
          <ListItemText primary={userData.first_name+" "+userData.last_name} />
          <Chip label="אשר" variant="outlined" color="primary" size="small" sx={{ marginRight: 1 }}onClick={confirmChip}/>
          <Chip label="דחה" variant="outlined" color="error" size="small" onClick={cancelChip} />

        </ListItemButton>
      </ListItem>
     </>
  );
}